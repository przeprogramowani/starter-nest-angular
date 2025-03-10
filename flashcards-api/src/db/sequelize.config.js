module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'src/db/flashcards.db',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: 'src/db/flashcards.db',
    logging: false,
  },
};
