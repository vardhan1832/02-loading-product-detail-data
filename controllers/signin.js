const User = require('../models/signin')
const bcrypt = require('bcrypt')

exports.postUserDetails = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const salts = 10;
        bcrypt.hash(password,salts, async (err,hash)=>{
            await User.create({name: name,email: email,totalexpense: 0,password: hash});
            res.status(201).json({message: 'success'})
        })
    }
    catch(err){
        res.status(500).json({error: err})
    }
}