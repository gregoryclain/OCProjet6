const express = require("express");
const router = express.Router();
const validator = require("../validators/user");
const userCtrl = require("../controllers/userController");

router.post("/signup", validator.signup, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
