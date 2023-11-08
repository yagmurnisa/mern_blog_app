const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {getCurrentUser, login, register} = require('../controllers/auth');

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, getCurrentUser);

module.exports = router;