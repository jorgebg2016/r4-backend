'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'password',
      Sequelize.STRING
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'users',
      'password'
    );
  }
};
