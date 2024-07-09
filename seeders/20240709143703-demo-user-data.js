'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: '123456', // Hashing the password
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser1',
        email: 'user1@example.com',
        password: 'user1Password123', // Hashing the password
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser2',
        email: 'user2@example.com',
        password: 'user2Password123', // Hashing the password
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser3',
        email: 'user3@example.com',
        password: 'user3Password123', // Hashing the password
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'regularUser4',
        email: 'user4@example.com',
        password: 'user4Password123', // Hashing the password
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
