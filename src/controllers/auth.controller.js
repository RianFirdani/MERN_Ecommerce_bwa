const prisma = require('../config/prisma')
const { errorResponse, successResponse } = require('../utils/response')
const cookieOption = require('../utils/cookieOption')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

//const prisma = new PrismaClient()

 const register = async (req, res) => {
    const { name, email, password } = req.body
    const duplicate = await prisma.user.findUnique({
        where: { email }
    })

    const hashPassword = await bcrypt.hash(password, 10)

    if (duplicate) errorResponse(res, "email Already Exist", null, 400)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    })
    return successResponse(res,"User Created",{id : user.id, name : user.name, email:user.email},200)
}

 const login = async (req, res) => {
    const { email, password } = req.body
    const user =  await prisma.user.findUnique({
        where : {email}
    })
    if(!user) errorResponse(res,"User is not existed",null,400)
    
    const isSuccess =await bcrypt.compare(password,user.password)

    if(!isSuccess)return errorResponse(res,"Wrong password",400)

    const token = await jwt.sign(user.id,process.env.SECRET)
    res.cookie('token',token,cookieOption(req))
    return successResponse(res,'Login Successfull',token,200)
}

 const logout = async (req,res)=>{
    res.clearCookie('token',{
        ...cookieOption(req),
        maxAge : undefined
    })
        return successResponse(res,'Logout Successfull')
}

module.exports = {register,login,logout}

