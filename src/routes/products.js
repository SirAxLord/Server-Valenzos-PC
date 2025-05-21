const { Router } = require('express');
const { getProducts, createProducts, updateProducts, deleteProducts, getProduct } = require('../controllers/products');

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

module.exports = router;