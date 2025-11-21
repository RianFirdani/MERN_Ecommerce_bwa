const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization) res.status(401).json({error : "Token Required"})
    
    const token = process.env.SECRET
    const bearerToken = authorization.split(' ')[1]

    try {
        const jwtDecode = jwt.verify(bearerToken,token)
        req.user = jwtDecode
        console.log(jwtDecode)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error : "Unauthorize"})
    }

}
module.exports = verifyToken