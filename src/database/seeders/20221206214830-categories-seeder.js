'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Ferramentas', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tecnologia', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Limpeza', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alimentos', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Moda', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Casa', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
