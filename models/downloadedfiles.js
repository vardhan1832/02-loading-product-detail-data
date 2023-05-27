const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const DownloadedFiles = sequelize.define('downloadedfiles',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    filesdownloaded: Sequelize.STRING
})

module.exports = DownloadedFiles;