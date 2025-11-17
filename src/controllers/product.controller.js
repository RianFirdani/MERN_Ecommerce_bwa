const upload = require("../middlewares/upload");
const prisma = require('../config/prisma')
const fs = require('fs')
const path = require('path')
const {errorResponse,successResponse} = require('../utils/response')

const cleanImage = (base,imagePath)=>{
    base.replace(/\$/,"") + imagePath.replace(/^\//,"")
}

const getAllProducts = async (req,res)=>{
    try {
        const prodcuts = await prisma.product.findMany({
            include : {inventory:true}
        })
        const base = `${req.protocol}://${req.get("host")}`
        const productWithImageUrl = prodcuts.map((product)=>({
            ...product,
            image : product.image ? cleanImage(base,product.image) : null
        }))
        return successResponse(res,"Data Shown",productWithImageUrl)
    } catch (error) {
        return errorResponse(res,"Product not found",error,404)
    }
}

const getProduct = async(req,res)=>{
    const {id} = req.params
    try {
        const prodcut = await prisma.product.findFirst({
            where : {id}
        })
        if(!prodcut || prodcut.length === 0) errorResponse(res,"There is no data")
        const base = `${req.protocol}://${req.get("host")}`
        const productWithImageUrl = prodcut.map((p)=>({
            ...p,
            image : p.image ? cleanImage(base,p.image) : null
        }))
        return successResponse(res,"Data Shown",productWithImageUrl)
    } catch (error) {
        return errorResponse(res,"Product not found",error,404)
    }
}

const getProductByInventory = async  (req,res)=>{
    const {id} = req.params
    try {
        const prodcut = await prisma.product.findFirst({
            where : {inventoryId : id}
        })
        if(!prodcut || prodcut.length === 0) errorResponse(res,"There is no data")
        const base = `${req.protocol}://${req.get("host")}`
        const productWithImageUrl = prodcut.map((p)=>({
            ...p,
            image : p.image ? cleanImage(base,p.image) : null
        }))
        return successResponse(res,"Data Shown",productWithImageUrl)
    } catch (error) {
        return errorResponse(res,"Product not found",error,404)
    }
}


const createProduct = async (req,res)=>{
    const {name,price,stock,description,inventoryId} = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : null

    const product = await prisma.product.create({
        data : {
            name,
        price:parseFloat(price),
        stock : parseInt(stock),
        description,
        inventoryId,
        image
        }
    })
    const base = `${req.protocol}://${req.get('host')}`
    return successResponse(req,"create product Succesfully",{
        ...product,
        image : product.image ? cleanImage(base,product.image) : null
    })
}

const deleteProduct = (req,res)=>{

}

const updateProduct = (req,res)=>{

}
