const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauceController");

router.post("/:id/like", sauceCtrl.like);
router.post("/", multer, sauceCtrl.create);
router.delete("/:id", sauceCtrl.delete);
router.put("/:id", multer, sauceCtrl.modifySauce);
router.get("/:id", sauceCtrl.getOneSauce);
router.get("/", sauceCtrl.list);

module.exports = router;
