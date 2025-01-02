const express = require("express");
const router = express.Router();
const infraCntrl = require("../../controller/infra/infra");

router.post("/", infraCntrl.upload.single("image"), infraCntrl.addInfra);
router.put("/:id", infraCntrl.upload.single("image"), infraCntrl.editInfra);
router.get("/", infraCntrl.getInfras);
router.delete("/:id", infraCntrl.deleteInfra);

module.exports = router;
