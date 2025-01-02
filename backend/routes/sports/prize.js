const express = require("express");
const router = express.Router();
const prizeCntrl = require("../../controller/sports/prize");
router.post("/", prizeCntrl.upload.single("image"), prizeCntrl.addPrize);
router.put("/:id", prizeCntrl.upload.single("image"), prizeCntrl.editPrize);
router.get("/", prizeCntrl.getPrizes);
router.delete("/:id", prizeCntrl.deletePrize);
module.exports = router;
