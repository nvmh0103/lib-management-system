const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lib-management-system', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432, // default PostgreSQL port
  });
  
  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      // Perform any database operations here
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
testConnection();

module.exports = sequelize;
