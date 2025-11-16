const express = require('express')
const {getInventories,getInventory,createInventory,deleteInventory,updateInventory} = require('../controllers/inventory.controller')
const  verifyToken  = require('../middlewares/verifyToken')

const router = express.Router()

router.use('/',(req,res)=> verifyToken(req,res))

router.get('/',getInventories)
router.get('/:id',getInventory)
router.post('/',createInventory)
router.put('/:id',updateInventory)
router.delete('/id',deleteInventory)


module.exports = router