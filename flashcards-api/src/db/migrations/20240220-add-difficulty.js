const { DataTypes } = require('sequelize');

async function up(queryInterface) {
  await queryInterface.addColumn('Flashcards', 'difficulty', {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'normal',
  });
}

async function down(queryInterface) {
  await queryInterface.removeColumn('Flashcards', 'difficulty');
}

module.exports = { up, down };
