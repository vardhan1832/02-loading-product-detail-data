const Order = require('../models/order')
const User = require('../models/signin')
const Expenses = require('../models/expenseTracker')
const sequelize = require('sequelize')

const getleaderboard = async (req,res,next)=>{
    try{
        const leaderboardUsers = await User.findAll({
            attributes: ['name','totalexpense'],
            order: [['totalexpense' , 'DESC']]
        })
        res.status(201).json(leaderboardUsers)
    }catch(err){
        console.log(err)
        res.status(405).json('error')
    }
}

module.exports = {
    getleaderboard
}