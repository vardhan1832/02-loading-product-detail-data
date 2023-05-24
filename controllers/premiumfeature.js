const Order = require('../models/order')
const User = require('../models/signin')
const Expenses = require('../models/expenseTracker')
const sequelize = require('sequelize')

const getleaderboard = async (req,res,next)=>{
    try{
        const aggregatedexpenses = await Expenses.findAll({
            attributes: ['UserId',],
            group: ['UserId']
        })
        const leaderboardUsers = await User.findAll({
            attributes: ['id','name',[sequelize.fn('sum' , sequelize.col('expenses.amount') ), 'total_amount']],
            include:[
                {
                    model: Expenses,
                    attributes: []
                }
            ],
            group: ['User.id'],
            order: [['total_amount' , 'DESC']]
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