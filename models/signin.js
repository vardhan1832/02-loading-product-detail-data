const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = sequelize.define('User',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    totalexpense:{
        type: Sequelize.DOUBLE
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremiumUser: Sequelize.BOOLEAN
})
module.exports = User;