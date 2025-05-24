const { Router } = require('express');
const { getServices, createServices, updateServices, deleteServices, getService } = require('../controllers/services');
const { verifyJWT } = require('../middelwares/verifyJWT');
const { verifyAdminRole } = require('../middelwares/verifyAdminRole');

const router = Router();

router.get("/", getServices);
router.get("/:id", [verifyJWT],  getService);
router.post("/", [verifyJWT, verifyAdminRole],  createServices);
router.put("/:id", [verifyJWT, verifyAdminRole], updateServices);
router.delete("/:id", [verifyJWT, verifyAdminRole], deleteServices);

module.exports = router;