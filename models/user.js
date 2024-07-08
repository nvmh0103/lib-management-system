const { Model, DataTypes } = require('sequelize');
const sequelize = require("../repository/db");

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Validates the email format
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Sequelize handles the default value
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Sequelize handles the default value
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'users', // Explicitly specify the table name to match the migration
  timestamps: true, // Enable timestamps
});

module.exports = User;