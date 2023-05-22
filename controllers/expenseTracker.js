const Expense = require('../models/expenseTracker');

exports.postExpenses = async (req,res,next)=>{
    try{
        const amount = req.body.amount;
        const category = req.body.categry;
        const description = req.body.descript;
        const data = await Expense.create({amount: amount,category: category,description: description})
        res.status(201).json({userexpense: data});
    }catch(err){
        res.status(500).json({error:err})
    }
}
exports.getExpenses = async (req,res,next)=>{
    try{
        const expenses = await Expense.findAll();
        res.status(201).json({allexpenses: expenses});
    }catch(err){
        res.status(500).json({error: err})
    }
}
exports.deleteExpense = async (req,res,next)=>{
    try{
        const id = req.params.expid;
        await Expense.destroy({where:{id: id}})
        res.status(201).json({message: 'expense deleted successfully'})
    }catch(err){
        res.status(500).json({error: err})
    }
}