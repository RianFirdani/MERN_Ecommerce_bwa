const prisma = require('../config/prisma')
const { connect } = require('../routes/invoice.route')
const{errorResponse,successResponse} = require('../utils/response')


const getAllCart = async (req,res)=>{
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
    console.log(req.user)
    if(!product) errorResponse(res,'there is no such a prooduct')
    const total = product.price * quantity

    const cart = await prisma.cart.create({
        data :{
            productId,
            quantity,
            total,
            userId : req.user.id
            // product : {
            //     connect : {id : product.id}
            // }
        },
        include : {product : true}
    })
    return successResponse(res,'Data Added!!')
}

module.exports = {getAllCart,addToCart}