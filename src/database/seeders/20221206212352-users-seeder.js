'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const bcrypt = await import('bcrypt');

    await queryInterface.bulkInsert('users', [
      {
        name: 'Jorge Fernando',
        email: 'jorge@user.com',
        password: await bcrypt.c('123456', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};


