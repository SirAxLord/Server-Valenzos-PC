const { Router } = require('express');
const { getProducts, createProducts, updateProducts, deleteProducts, getProduct } = require('../controllers/products');
const { verifyJWT } = require('../middelwares/verifyJWT');
const { verifyAdminRole } = require('../middelwares/verifyAdminRole');

const router = Router();

router.get("/", getProducts);
router.get("/:id", [verifyJWT], getProduct);
router.post("/", [verifyJWT, verifyAdminRole], createProducts);
router.put("/:id", [verifyJWT, verifyAdminRole], updateProducts);
router.delete("/:id", [verifyJWT, verifyAdminRole],  deleteProducts);

module.exports = router;