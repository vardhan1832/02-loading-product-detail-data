const Sequelize = require('sequelize');

const sequelize = new Sequelize('expenses','root','nikenduku',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;