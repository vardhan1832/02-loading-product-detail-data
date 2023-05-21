const User = require('../models/signin')
const bcrypt = require('bcrypt')

exports.loginUser = async (req,res,next)=>{
    try{
        let usermail = await User.findAll({where: {
            email: req.body.email
        }})
        if(usermail === undefined || usermail.length===0){
            res.status(404).json({message: 'Email doesnot exits'})
        }else if(usermail.length>0){
            bcrypt.compare(req.body.password , usermail[0].password, (err,result)=>{
                if(err){
                    throw new Error('something went wrong')
                }else{
                    if(result){
                        res.status(201).json({message: 'login successfull'})
                    }else{
                        res.status(400).json({message: 'password incorrect'})
                    }
                }
            })   
        }
    }
    catch(err){
        res.status(500).json({message: err})
    }
}