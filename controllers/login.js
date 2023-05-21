const User = require('../models/signin')

exports.loginUser = async (req,res,next)=>{
    try{
        let usermail = await User.findAll({where: {
            email: req.body.email
        }})
        if(usermail === undefined || usermail.length===0){
            res.status(404).json({message: 'Email doesnot exits'})
        }else if(usermail.length>0){
            if(usermail[0].password === req.body.password){
                res.status(201).json({message: 'login successfull'})
            }else{
                res.status(400).json({message: 'password incorrect'})
            }
        }
    }
    catch(err){
        res.status(500).json({message: err})
    }
}