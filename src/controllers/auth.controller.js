const {PrismaClient} = require('@prisma/client')
const { errorResponse, successResponse } = require('../utils/response')
const cookieOption = require('../utils/cookieOption')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

 const register = async (req, res) => {
    const { name, email, password } = req.body
    const duplicate = await prisma.user.findUnique({
        where: { email }
    })

    const hashPassword = bcrypt.hash(password, 10)

    if (duplicate) errorResponse(res, "email Already Exist", null, 400)
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwoord: hashPassword
        }
    })
    return successResponse(res,"User Created",{id : user.id, name : user.name, email:user.email},200)
}

 const login = async (req, res) => {
    const { email, password } = req.body
    const user = prisma.user.findUnique({
        where : {email}
    })
    if(!user) errorResponse(res,"User is not existed",null,400)
    
    const isSuccess = bcrypt.compare(password,user.password)

    if(isSuccess){
        const token = jwt.sign(user.id,process.env.TOKEN)
        return successResponse(res,"Login successFull",{token},200)
    }
}

 const logout = async (req,res)=>{
    console.log('anggap ja logoout')
}

module.exports = {register,login,logout}

