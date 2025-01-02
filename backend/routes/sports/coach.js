const express = require("express");
const router = express.Router();
const coachCntrl = require("../../controller/sports/coach");
router.post("/", coachCntrl.upload.single("image"),coachCntrl.addCoach);
router.put("/:id", coachCntrl.upload.single("image"),coachCntrl.editCoach);
router.get("/", coachCntrl.getCoachs);
router.delete("/:id", coachCntrl.deleteCoach);
module.exports = router;
