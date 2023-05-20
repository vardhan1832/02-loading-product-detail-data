const User = require('../models/signin')

exports.postUserDetails = async (req,res,next)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userInfo =await User.create({name: name,email: email,password: password});
        res.status(201).json({userDetails: userInfo})
    }
    catch(err){
        res.status(500).json({error: err})
    }
}