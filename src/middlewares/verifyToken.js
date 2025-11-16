const jwt = require('jsonwebtoken')

const verifyToken = (req,res)=>{
    const {authorization} = req.headers

    if(!authorization) res.status(401).json({error : "Token Required"})
    
    const token = "RahasiaParah"
    const bearerToken = authorization.split(' ')[1]

    try {
        const jwtDecode = jwt.verify(bearerToken,token)
        req.userData = jwtDecode
        next()
    } catch (error) {
        res.status(401).json({error : "Unauthorize"})
    }

}
module.exports = verifyToken