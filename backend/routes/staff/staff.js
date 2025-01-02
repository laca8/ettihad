const express = require("express");
const router = express.Router();
const staffCntrl = require("../../controller/staff/staff");

router.post("/", staffCntrl.upload.single("image"), staffCntrl.addStaff);
router.put("/:id", staffCntrl.upload.single("image"), staffCntrl.editStaff);
router.get("/", staffCntrl.getStaffs);
router.delete("/:id", staffCntrl.deleteStaff);

module.exports = router;
