const prisma = require('../config/prisma')
const{errorResponse,successResponse} = require('../utils/response')


const getAllCard = async (req,res)=>{
    console.log(req.user)
    const cart = await prisma.cart.findMany({
        where : {
            userId : req.user.id
        }
    })
    return successResponse(res,"successfull to get all cart data",cart)
}

const addToCart = async(req,res)=>{
    const {productId,quantity} = req.body

    const product = await prisma.product.findFirst({
        where : {id : productId}
    })
    if(!product) errorResponse(res,'there is no such a prooduct')
    const total = product.price * quantity

    const cart = await prisma.cart.create({
        data :{
            productId,
            quantity,
            total,
            userId : req.user.id
        }
    })
}