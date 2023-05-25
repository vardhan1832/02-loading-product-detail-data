const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const forgotpassword = sequelize.define('forgotPasswordRequests',{
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    isactive: Sequelize.BOOLEAN
})
module.exports = forgotpassword;