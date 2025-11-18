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
    console.log(req.body)
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
    return successResponse(res,"create product Succesfully",{
        ...product,
        image : product.image ? cleanImage(base,product.image) : null
    })
}

const deleteProduct = async (req,res)=>{
    const {id} = req.params
    try {
        const product = await prisma.product.delete({
            where : {id}
        })
        if(!product) errorResponse(res,"Data not found id : " + id)
        
        if(product.image){
            const oldImagePath = path.join(
                process.cwd(),
                "uploads",
                path.basename(product.image)
            )
            fs.unlink(oldImagePath , (e)=>{
                if(e) console.log("Update data failed")
                else console.log("Update data success")
        })
        }
        return successResponse(res,"Success to delete data id : " + id)
    } catch (error) {
        return errorResponse(res,"Failed to delete data",null,401)
    }
}

const updateProduct = async (req,res)=>{
    const {name,price,stock,description,inventoryId} = req.body
    const image = req.file ? `/uploads/${req.file.filename}` : undefined

    try {
        const product = await prisma.product.findFirst({
            where : {id}
        })
    if(!product) errorResponse(res,"Data not found",null,404)

    if(image && product.image) {
        const oldImagePath = path.join(
            process.cwd(),
            "uploads",
            path.basename(product.image)
        )
        fs.unlink(oldImagePath , (e)=>{
                if(e) console.log("Update data failed")
                else console.log("Update data success")
        })
        
    }
    const updateData = {
            name,
            description,
            price:parseFloat(price),
            stock:parseInt(stock),
            inventoryId,
    }
    if(image) updateData.image = image

    const updateProduct = await prisma.product.update({
        where : {id},
        data : updateData
    })
    const base = `${req.protocol}://${req.get("host")}`
    return successResponse(req,"Update Product id : "+id,{
        ...updateProduct,
        image : updateProduct.image ? cleanImage(base,updateProduct.image) : null 
    })
    } catch (error) {
        return errorResponse(res,"Update data failed",{
            message : error.message
        })
    }
}

module.exports = {getAllProducts,getProduct,getProductByInventory,createProduct,deleteProduct,updateProduct}