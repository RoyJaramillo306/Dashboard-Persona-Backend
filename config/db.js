const Sequelize = require('sequelize');

exports.sequelize = new Sequelize('prueba', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
  });



