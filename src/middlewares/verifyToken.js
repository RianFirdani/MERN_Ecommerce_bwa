const jwt = require('jsonwebtoken')

export const verifyToken = (req,res)=>{
    const {authorization} = req.headers

    if(!authorization) res.status(401).json({error : "Token Required"})
    
    const token = process.env.TOKEN
    const bearerToken = authorization.split(' ')[1]

    try {
        const jwtDecode = jwt.verify(bearerToken,token)
        req.userData = jwtDecode
        next()
    } catch (error) {
        res.status(401).json({error : "Unauthorize"})
    }

}