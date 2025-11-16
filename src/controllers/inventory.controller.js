const prisma = require('../config/prisma')
const { errorResponse, successResponse } = require('../utils/response')

const getInventories = async(req,res)=>{
    const data = await prisma.inventory.findMany()
    return successResponse(res,"Data shown",data,200)
}

const getInventory = async(req,res)=>{
    const {id} = req.params
    const data = await prisma.inventory.findFirst({
        where : {
            id
        }
    })
    return successResponse(res,`Data id : ${id}`,data,200)
}

const createInventory = async(req,res)=>{
    const {}  = req.body
    const process = await prisma.inventory.create({

    })
}

const deleteInventory = async(req,res)=>{
    const {id} = req.params
    const process = await prisma.inventory.delete({
        where : {id}
    })
    return successResponse(res,`Delete Data id : ${id}`,data,200)
}

const updateInventory = async(req,res)=>{
    const {id} = req.params
    const {}  = req.body

    const process = await prisma.inventory.update({
        where : {id},
        data: {

        }
    })
    return successResponse(res,`Update Data id : ${id}`,data,200)
}

module.exports = {getInventories,getInventory,createInventory,deleteInventory,updateInventory}