const jwt = require("jsonwebtoken")

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers 
    if(!token){ 
        res.json({success: false, message: "not authorized"})
    }
    try {  
        const data = jwt.verify(token, "secret_ecom")
        req.user = data    
        next()
    } catch (error) {  
        console.log("user 1", error)
        res.json({success: false, message: 'Error'})
    }
} 
 
module.exports = authMiddleware   