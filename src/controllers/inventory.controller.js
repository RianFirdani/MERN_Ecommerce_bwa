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
    const {name,description}  = req.body

    if(!name || !description) errorResponse(res,"Data cannot be empty")

    const process = await prisma.inventory.create({
        data : {
            name,
            description
        }
    })
    return successResponse(res,'Data added')
}

const deleteInventory = async(req,res)=>{
    const {id} = req.params
    const process = await prisma.inventory.delete({
        where : {id}
    })
    if(!process) errorResponse(res,`Data id : ${id} tidak ada`)
    return successResponse(res,`Delete Data id : ${id}`,data,200)
}

const updateInventory = async(req,res)=>{
    const {id} = req.params
    const {name,description}  = req.body

    if(!name || !description) errorResponse(res,"Data cannot be empty")

    const process = await prisma.inventory.update({
        where : {id},
        data: {
            name,
            description
        }
    })
    if(!process) errorResponse(res,`Data id : ${id} tidak ada`)
    return successResponse(res,`Update Data id : ${id}`,data,200)
}

module.exports = {getInventories,getInventory,createInventory,deleteInventory,updateInventory}