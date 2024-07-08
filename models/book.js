const { Model, DataTypes } = require('sequelize');
const sequelize = require("../repository/db");

Book.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_borrowed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  modelName: 'Book', // We need to choose the model name
  tableName: 'books', // Explicitly specify the table name to match the migration
  timestamps: true, // Enable timestamps
});

module.exports = Book;