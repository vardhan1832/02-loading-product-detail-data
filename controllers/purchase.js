const Order = require('../models/order')
const User = require('../models/signin')
const Razorpay = require('razorpay');

const purchasepremium = async (req,res,next)=>{
    try{
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;
        rzp.orders.create({amount, currency:'INR'},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid: order.id, status: 'PENDING'})
            .then(()=>{
               return res.status(201).json({order, key_id: rzp.key_id})
            })
            .catch(err=>{
                throw new Error(err)
            })
        })
    }catch(err){
        console.log(err)
        res.status(403).json({message: 'something went wrong', error: err})
    }
}
const updatetransactionstatus = async (req,res,next)=>{
    try{
        const { order_id , payment_id} = req.body;
        if(payment_id){
            const order = await Order.findOne({where: { orderid: order_id}})
            let promise1 =  order.update({paymentid: payment_id , status: "SUCCESS"})
            let promise2 =  req.user.update({isPremiumUser: true})
            Promise.all([promise1,promise2]).then(()=>{
                res.status(202).json({success: true, message: 'Transaction successful'})
            }).catch(err=>{
                throw new Error(err);
             })
        }else{
            const order = await Order.findOne({where: { orderid: order_id}})
            order.update({status: "FAILED"}).then(()=>{
                res.status(202).json({success: true, message: 'Transaction failed'})
            })
        } 
    }catch(err){
        console.log(err)
        return res.status(405).json({message: 'Transaction failed'})
    }
}

module.exports = {
    purchasepremium,
    updatetransactionstatus
}