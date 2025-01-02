const express = require("express");
const router = express.Router();
const memberCntrl = require("../../controller/member/member");

router.post("/", memberCntrl.upload.single("image"), memberCntrl.addMember);
router.put("/:id", memberCntrl.upload.single("image"), memberCntrl.editMember);
router.get("/", memberCntrl.getMembers);
router.delete("/:id", memberCntrl.deleteMember);

module.exports = router;
