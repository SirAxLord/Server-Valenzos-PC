const { Router } = require('express');
const { getServices, createServices, updateServices, deleteServices, getService } = require('../controllers/services');

const router = Router();

router.get("/", getServices);
router.get("/:id", getService);
router.post("/", createServices);
router.put("/:id", updateServices);
router.delete("/:id", deleteServices);

module.exports = router;