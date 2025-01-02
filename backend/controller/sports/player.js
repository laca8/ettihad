const Player = require("../../models/sports/Player");
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

const addPlayer = async (req, res) => {
  const {
    code,
    name,
    game,
    sex,
    national_Id,
    address,
    phone1,
    phone2,
    contract_value,
    bills_num,
    bill_value,
    bills_paid,
    bills_remaining,
    rewards,
    penalits,
    image,
  } = req.body;
  try {
    const player = new Player({
      code,
      name,
      game,
      sex,
      national_Id,
      address,
      phone1,
      phone2,
      contract_value,
      bills_num,
      bill_value,
      bills_paid,
      bills_remaining,
      rewards,
      penalits,
      image,
    });
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editPlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(player);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("player deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getPlayers = async (req, res) => {
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
    const players = await Player.find({ ...k1, ...k2 });
    res.status(201).send(players);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addPlayer,
  editPlayer,
  getPlayers,
  deletePlayer,
  upload,
};
