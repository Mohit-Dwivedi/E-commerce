const Order  = require ("../model/OrderModel.js")
const  User  = require ("../model/user.js")
const Stripe = require("stripe");

const stripe = new Stripe("sk_test_51PhHWPCkVyeyADEipmslLdOijJeYzITZ1cEn0yIstaOgMfCaaU4Nb2Yqdead70UUwtbaleoVq40jDwva3vQlob7700Io6xWyrR" )

//plcaing user order from frontend 
const placeOrder = async (req,res) => { 
    const frontend_url = "http://localhost:5173"

    try { 
        const order = new Order({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await order.save()
        await User.findByIdAndUpdate(req.body.userId, {cartData: {}})

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*80
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment', 
            success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}` 
        })

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error) 
        res.json({
            success: false,
            message: "Error"
        })
    } 
} 

const verifyOrder = async (req,res) => {
    const {orderId, success} = req.body 
    try {
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId, {payment:true})
            res.json({success: true, message: "paid"})
        }
        else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false, message: "Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

const userOrder = async (req,res) => {
    try { 
        const orders = await Order.find({userId: req.user.id})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

const listOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.json({success: true, data: orders})
    } catch (error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
} 

const updateOrder = async (req,res) => {
    try {
        await Order.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, messsge: "Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

module.exports = {placeOrder, verifyOrder, userOrder, listOrders, updateOrder}