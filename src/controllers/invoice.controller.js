const prisma = require("../config/prisma")
const { errorResponse, successResponse } = require("../utils/response")

const getAllInvoice = async (req,res)=>{
    try {
        const data = await prisma.invoice.findMany()
        return successResponse(res,"Success to get data", data)
    } catch (error) {
        return errorResponse(res,"Error : " + error)
    }
}

const getInvoiceById = async (req,res)=>{
    try {
        const {id} = req.params
        const data = await prisma.invoice.findFirst({
            where : {id}
        })
        return successResponse(res,"Success to get data", data)
    } catch (error) {
        return errorResponse(res,"Error : " + error)
    }
}

const getInvoiceByEmail = async (req,res)=>{
    try {
        const {email} = req.params
        const data = await prisma.invoice.findFirst({
            where : {email}
        })
        return successResponse(res,"Success to get data", data)
    } catch (error) {
        return errorResponse(res,"Error : " + error)
    }
}

const checkOut = async (req,res)=>{
    const {email,name,phone,date} = req.body

    //cget cart current user loogged in
    const carts = await prisma.cart.findMany({
        where : {userId : req.user.id},
        include : {product : true}
    })

    if(carts.length === 0 ) errorResponse(res,"Cart is empty",null,404)

    const items = carts.map(c => `${c.product.name} x ${c.quantity}`).join(', ')
    const total = carts.reduce((sum,item)=>sum + item.total,0)

    const invoice = await prisma.invoice.create({
        data :{
            email,
            name,
            phone,
            date : new Date(date),
            items,
            total,
            userId : req.user.id
        }
    })

    if(invoice){
        const deleteCart = await prisma.cart.deleteMany({
            where : {userId : req.user.id}
        })
        return successResponse(res,"Checkout!!!",invoice)
    }
    return errorResponse(res,"Failed to checkout")
}

module.exports = {getAllInvoice,getInvoiceByEmail,getInvoiceById,checkOut}