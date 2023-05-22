const User = require('../models/signin');
const jwt = require('jsonwebtoken');

const authentication = async (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        const userobj = jwt.verify(token , 'jfnciuerbviuerfhierhf3475tiuhgr3iuhwef98rgwer724u948hfuiud')
        const user = await User.findByPk(userobj.UserId);
        if(user){
            req.user = user;
            next();
        }else{
            throw new Error('something went wrong')
        }
    }catch(err){
        console.log(err)
        res.status(401).json({message: err})
    }
}

module.exports = {
    authentication
}