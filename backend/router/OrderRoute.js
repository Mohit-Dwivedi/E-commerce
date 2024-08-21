const express = require("express");
const  { listOrders, placeOrder, updateOrder, userOrder, verifyOrder } = require('../controller/OrderController.js')
const authMiddleware = require('../middleware/auth.js') 
const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorders', authMiddleware, userOrder)
orderRouter.get('/listorder', listOrders)
orderRouter.put('/updateorder', updateOrder)

module.exports = orderRouter