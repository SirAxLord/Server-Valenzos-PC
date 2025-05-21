const { Router } = require('express');
const { login, register } = require('../controllers/auth');

const router = Router();

router.post("/login", login);
router.post("/:registro", register);

module.exports = router;