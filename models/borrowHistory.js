const { Model, DataTypes } = require('sequelize');
const sequelize = require("../repository/db");

class BorrowHistory extends Model {}

BorrowHistory.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // name of the Users table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books', // name of the Books table
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  borrowDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: true // This allows the return date to be null initially
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'BorrowHistory', // We need to choose the model name
  tableName: 'borrow_history', // Explicitly specify the table name to match the migration
  timestamps: true, // Enable timestamps
});

module.exports = BorrowHistory;