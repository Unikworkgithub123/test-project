const Sequelize = require('sequelize');
const config = require('./config');

// database connection 
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.dialect,
  operatorsAliases: 0,
  port:25075,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
},
});

const dbConnectTest = async () => {
  try {
      await sequelize.authenticate();
      console.log('Database Connection has been established successfully.');
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
}
dbConnectTest()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//<---------------------- import models-------------------------------------------->
db.image = require('../models/image.model')(sequelize, Sequelize);



db.sequelize.sync({farce:true});
module.exports = db;
