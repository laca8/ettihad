const express = require("express");
const router = express.Router();
const boardCntrl = require("../../controller/board/boardCntrl");

router.post("/", boardCntrl.addBoard);
router.put("/:id", boardCntrl.editBoard);
router.get("/", boardCntrl.getBoards);
router.delete("/:id", boardCntrl.deleteBoard);

module.exports = router;
