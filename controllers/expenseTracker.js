const Expense = require('../models/expenseTracker');
const sequelize = require('../util/database')

exports.postExpenses = async (req,res,next)=>{
    const t = await sequelize.transaction()
    try{
        const amount = req.body.amount;
        const category = req.body.categry;
        const description = req.body.descript;
        let total_expenses = Number(amount) + Number(req.user.totalexpense);
        const data = await Expense.create({amount: amount,category: category,description: description , UserId: req.user.id},{transaction: t})
        await req.user.update({totalexpense: total_expenses },{transaction: t})
        await t.commit()
        res.status(201).json({userexpense: data});
    }catch(err){
        await t.rollback()
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
    const t = await sequelize.transaction();
    try{
        const id = req.params.expid; 
        const expense = await Expense.findByPk(id)
        const amount = expense.amount;
        let total_expenses = Number(req.user.totalexpense) -  Number(amount);
        if(expense.UserId === req.user.id){
            await Expense.destroy({where:{id: id, UserId: req.user.id}},{transaction: t})
            await req.user.update({totalexpense: total_expenses },{transaction: t})
            await t.commit()
            res.status(201).json({message: 'expense deleted successfully'})
        }else{
            throw new Error(err)
        }
    }catch(err){
        await t.rollback()
        res.status(500).json({error: err})
    }
}