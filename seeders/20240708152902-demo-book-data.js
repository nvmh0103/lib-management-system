'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [
      {
        isbn: '978-0141187761',
        title: '1984',
        author: 'George Orwell',
        publishedDate: '1949-06-08',
        genre: 'Dystopian',
        is_borrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '978-0439023528',
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        publishedDate: '2008-09-14',
        genre: 'Science Fiction',
        is_borrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        isbn: '978-0316769488',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        publishedDate: '1951-07-16',
        genre: 'Literary Fiction',
        is_borrowed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
