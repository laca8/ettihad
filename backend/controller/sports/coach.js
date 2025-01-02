const Coach = require("../../models/sports/Coach");
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
const addCoach = async (req, res) => {
  try {
    const coach = new Coach(req.body);
    await coach.save();
    res.status(201).send(coach);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(coach);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("coach deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getCoachs = async (req, res) => {
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
    const coachs = await Coach.find({...k1,...k2});
    res.status(201).send(coachs);
 
    
  } catch (error) {
    console.log(error);
    
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addCoach,
  editCoach,
  getCoachs,
  deleteCoach,
  upload
};
