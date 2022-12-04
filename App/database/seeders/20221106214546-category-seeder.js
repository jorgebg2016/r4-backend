'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      { name: 'Limpeza', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alimentação', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ferramentas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tecnologia', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
