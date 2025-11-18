const express = require("express");
const {
  getAllProducts,
  getProduct,
  getProductByInventory,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
const upload = require("../middlewares/upload");
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.get("/",getAllProducts);
router.get("/:id",getProduct);
router.get("/inventory/:id",getProductByInventory);
router.post('/',verifyToken,upload.single("image"),createProduct)
router.delete('/',verifyToken,deleteProduct)
router.put('/',verifyToken,upload.single("image"),updateProduct)

module.exports = router
