const Order = require('../models/order')
const User = require('../models/signin')
const Razorpay = require('razorpay');

const purchasepremium = async (req,res,next)=>{
    try{
        const rzp = new Razorpay({
            key_id: 'rzp_test_m75WdNO5QlQ7ny',
            key_secret: '2VgIUX9EU10M1x3A1ny2F6kN'
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
        Order.findOne({where: { orderid: order_id}}).then(order=>{
            order.update({paymentid: payment_id , status: "SUCCESS"}).then(()=>{
                req.user.update({isPremiumUser: true}).then(()=>{
                    return res.status(202).json({success: true, message: 'Transaction successful'})
                }).catch(err=>{
                    throw new Error(err)
                })
            }).catch(err=>{
                throw new Error(err)
            })
        })
    }catch(err){
        console.log(err)
        return res.status(405).json({message: 'Transaction failed'})
    }
}

module.exports = {
    purchasepremium,
    updatetransactionstatus
}