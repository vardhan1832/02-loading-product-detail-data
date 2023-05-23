// const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database')

const User = require('./models/signin')
const Expense = require('./models/expenseTracker')
const Order = require('./models/order')

var cors = require('cors')

const app = express();
app.use(cors())

const signinroutes = require('./routes/signin')
const loginroutes = require('./routes/login')
const expenseroutes = require('./routes/expenseTracker')
const purchaseroutes = require('./routes/purchase')


app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',signinroutes);
app.use('/user',loginroutes)
app.use('/user',expenseroutes)
app.use(purchaseroutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)


sequelize.sync()
.then(res=>{
    // console.log(res)
    app.listen(4000)
})
.catch(err=>{
    console.log(err);
})


