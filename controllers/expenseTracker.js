const Expense = require('../models/expenseTracker');

exports.postExpenses = async (req,res,next)=>{
    try{
        const amount = req.body.amount;
        const category = req.body.categry;
        const description = req.body.descript;
        const data = await Expense.create({amount: amount,category: category,description: description , UserId: req.user.id})
        res.status(201).json({userexpense: data});
    }catch(err){
        res.status(500).json({error:err})
    }
}
exports.getExpenses = async (req,res,next)=>{
    try{
        const expenses = await req.user.getExpenses();
        res.status(201).json({allexpenses: expenses, isPremiumUser: req.user.isPremiumUser});
    }catch(err){
        res.status(500).json({error: err})
    }
}
exports.deleteExpense = async (req,res,next)=>{
    try{
        const id = req.params.expid;
        const expense = await Expense.findByPk(id)
        if(expense.UserId === req.user.id){
            await Expense.destroy({where:{id: id, UserId: req.user.id}})
            res.status(201).json({message: 'expense deleted successfully'})
        }else{
            throw new Error(err)
        }
    }catch(err){
        res.status(500).json({error: err})
    }
}