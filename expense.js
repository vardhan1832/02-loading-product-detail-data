// const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database')

var cors = require('cors')

const expense = express();
expense.use(cors())

const signinroutes = require('./routes/signin')


expense.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// expense.use(express.static(path.join(__dirname, 'public')));

expense.use(signinroutes);


sequelize.sync()
.then(res=>{
    // console.log(res)
    expense.listen(3000)
})
.catch(err=>{
    console.log(err);
})


