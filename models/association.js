
const User = require('./user');
const BorrowHistory = require('./borrowHistory');
const Book = require('./book');

BorrowHistory.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(BorrowHistory, { foreignKey: 'userId' });

BorrowHistory.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(BorrowHistory, { foreignKey: 'bookId' });
