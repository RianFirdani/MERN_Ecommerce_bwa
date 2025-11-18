const prisma = require('../config/prisma')


const getAllCard = async (req,res)=>{
    const cart = await prisma.cart.findMany({
        where : {
            userId : req.user.userId
        }
    })
}