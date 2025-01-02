const express = require("express");
const router = express.Router();
const playerCntrl = require("../../controller/sports/player");
router.post("/", playerCntrl.upload.single("image"), playerCntrl.addPlayer);
router.put("/:id", playerCntrl.upload.single("image"), playerCntrl.editPlayer);
router.get("/", playerCntrl.getPlayers);
router.delete("/:id", playerCntrl.deletePlayer);
module.exports = router;
