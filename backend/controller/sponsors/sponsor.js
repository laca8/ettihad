const Sponsor = require("../../models/sponsors/Sponsor");
const multer = require("multer");
const path = require("path");
// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be stored in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only specific file types
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 0.5 * 1024 * 1024, // 500KB file size limit
  },
});
const addSponsor = async (req, res) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    res.status(201).send(sponsor);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(sponsor);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Sponsor deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getSponsors = async (req, res) => {
  try {
    const k1 = req.query.code
      ? {
          code: {
            $regex: req.query.code?.toString(),
          },
        }
      : {};
    const k2 = req.query.name
      ? {
          name: {
            $regex: req.query.name,
            $options: "i",
          },
        }
      : {};
    const sponsors = await Sponsor.find({ ...k1, ...k2 });
    res.status(201).send(sponsors);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addSponsor,
  editSponsor,
  getSponsors,
  deleteSponsor,
  upload,
};
