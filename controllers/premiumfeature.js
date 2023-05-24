const Order = require('../models/order')
const User = require('../models/signin')
const Expenses = require('../models/expenseTracker')

const getleaderboard = async (req,res,next)=>{
    try{
        const expenses = await Expenses.findAll()
        const users = await User.findAll()
        const aggregatedexpenses = {};
        expenses.forEach(expense => {
            if(aggregatedexpenses[expense.UserId]){
                aggregatedexpenses[expense.UserId] += expense.amount
            }else{
                aggregatedexpenses[expense.UserId] = expense.amount
            }
            });
        let leaderboardUser = []
        users.forEach(user=>{
            leaderboardUser.push({ name: user.name , total_amount: aggregatedexpenses[user.id]});
        })
        leaderboardUser.sort((a,b) => b.total_amount - a.total_amount)
        res.status(201).json(leaderboardUser)
    }catch(err){
        console.log(err)
        res.status(405).json('error')
    }
}

module.exports = {
    getleaderboard
}