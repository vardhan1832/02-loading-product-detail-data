const User = require('../models/signin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateAccessToken(id,name){
    return jwt.sign({UserId: id, name: name},'jfnciuerbviuerfhierhf3475tiuhgr3iuhwef98rgwer724u948hfuiud')
}

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
                        res.status(201).json({message: 'login successfull',token: generateAccessToken(usermail[0].id,usermail[0].name)})
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