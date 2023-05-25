const Sib = require('sib-api-v3-sdk');
require('dotenv').config();



exports.forgotpassword = async (req,res,next)=>{
    try{

        const email = req.body.email;

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.SIB_API_KEY;
        const tranEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
            email: 'sreevardhan259@gmail.com'
        }
        const receivers= [
            {
                email: email
            }
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forgot Password',
            textContent: 'link for resetting password'
        }).then((response)=>{
            res.status(201).json(response)
        }).catch((err)=>{
            console.log(err)
        })
        
    }catch(err){
        res.status(500).json({message: err})
    }
}