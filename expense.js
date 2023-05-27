// const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database')

const User = require('./models/signin')
const Expense = require('./models/expenseTracker')
const Order = require('./models/order')
const ForgotPasswordRequests = require('./models/forgotpass')
const DownloadedFiles = require('./models/downloadedfiles')

var cors = require('cors')

const app = express();
app.use(cors())

const signinroutes = require('./routes/signin')
const loginroutes = require('./routes/login')
const expenseroutes = require('./routes/expenseTracker')
const purchaseroutes = require('./routes/purchase')
const premiumfeatureroutes = require('./routes/premiumfeature')


app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',signinroutes);
app.use(loginroutes)
app.use('/user',expenseroutes)
app.use(purchaseroutes)
app.use(premiumfeatureroutes)

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgotPasswordRequests)
ForgotPasswordRequests.belongsTo(User)

User.hasMany(DownloadedFiles)
DownloadedFiles.belongsTo(User)


sequelize.sync()
.then(res=>{
    // console.log(res)
    app.listen(4000)
})
.catch(err=>{
    console.log(err);
})


