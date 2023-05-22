const express = require('express')
const expenseController = require('../controllers/expenseTracker');
const router = express.Router();

router.post('/add-expense',expenseController.postExpenses);
router.get('/add-expense',expenseController.getExpenses)
router.delete('/add-expense/:expid',expenseController.deleteExpense)

module.exports = router;
