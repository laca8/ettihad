const express = require("express");
const router = express.Router();
const lectureCntrl = require("../../controller/lecture/lecture");

router.post("/", lectureCntrl.addLecture);
router.put("/:id", lectureCntrl.editLecture);
router.get("/", lectureCntrl.getLectures);
router.delete("/:id", lectureCntrl.deleteLecture);

module.exports = router;
