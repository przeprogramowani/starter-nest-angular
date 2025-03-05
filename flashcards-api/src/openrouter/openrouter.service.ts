import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ChatCompletionRequest,
  ChatCompletionResponse,
  ChatMessage,
} from './openrouter.types';

@Injectable()
export class OpenRouterService {
  private readonly logger = new Logger(OpenRouterService.name);
  private readonly baseUrl = 'https://openrouter.ai/api/v1/';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    if (typeof apiKey !== 'string') {
      throw new Error('OpenRouter API key is not configured');
    }

    this.httpService.axiosRef.defaults.baseURL = this.baseUrl;
    this.httpService.axiosRef.defaults.headers.common['Authorization'] =
      `Bearer ${apiKey}`;
    this.httpService.axiosRef.defaults.headers.common['HTTP-Referer'] =
      'https://github.com/przeprogramowani/Flashcards';
  }

  async chatCompletionAsync(
    model: string,
    messages: ChatMessage[],
    temperature: number | null = null,
    maxTokens: number | null = null,
  ): Promise<ChatCompletionResponse> {
    try {
      const request: ChatCompletionRequest = {
        model,
        messages,
        temperature: temperature !== null ? temperature : 0.7,
        max_tokens: maxTokens !== null ? maxTokens : undefined,
      };

      this.logger.debug(
        `Sending request to OpenRouter API: ${JSON.stringify(request)}`,
      );

      const { data } = await firstValueFrom(
        this.httpService
          .post<ChatCompletionResponse>('chat/completions', request)
          .pipe(
            catchError((error: AxiosError) => {
              const responseData = error.response?.data;
              this.logger.error(
                `OpenRouter API returned error status code: ${error.response?.status}, Response: ${JSON.stringify(responseData)}`,
              );
              throw new Error(
                `OpenRouter API returned ${error.response?.status}: ${JSON.stringify(responseData)}`,
              );
            }),
          ),
      );

      this.logger.debug(`OpenRouter API raw response: ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('OpenRouter API returned')
      ) {
        throw error;
      }
      this.logger.error(
        `Unexpected error communicating with OpenRouter API: ${error}`,
      );
      throw new Error(
        `Unexpected error communicating with OpenRouter API: ${error}`,
      );
    }
  }

  async getCompletionTextAsync(prompt: string, model: string): Promise<string> {
    try {
      const result = await this.chatCompletionAsync(model, [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ]);

      const content = result?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('No valid response content received from AI service');
      }

      return content;
    } catch (error) {
      this.logger.error(
        `Error getting completion from OpenRouter API: ${error}`,
      );
      throw error;
    }
  }
}
