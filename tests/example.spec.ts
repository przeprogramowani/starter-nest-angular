import {expect, test} from "@playwright/test";

test("smoke test", async ({page}) => {
  await page.goto("http://localhost:4200/");

  await expect(page.getByText("Flashcards", {exact: true})).toBeVisible();
});
