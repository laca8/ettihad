const express = require("express");
const router = express.Router();
const sponsorCntrl = require("../../controller/sponsors/sponsor");

router.post("/", sponsorCntrl.upload.single("image"), sponsorCntrl.addSponsor);
router.put(
  "/:id",
  sponsorCntrl.upload.single("image"),
  sponsorCntrl.editSponsor
);
router.get("/", sponsorCntrl.getSponsors);
router.delete("/:id", sponsorCntrl.deleteSponsor);

module.exports = router;
