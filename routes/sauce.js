const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauceController");

router.post("/", multer, sauceCtrl.create);
router.get("/", sauceCtrl.list);

module.exports = router;
