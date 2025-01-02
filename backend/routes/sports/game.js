const express = require("express");
const router = express.Router();
const gameCntrl = require("../../controller/sports/game");

router.post("/", gameCntrl.addGame);
router.put("/:id", gameCntrl.editGame);
router.get("/", gameCntrl.getGames);
router.delete("/:id", gameCntrl.deleteGame);

module.exports = router;
