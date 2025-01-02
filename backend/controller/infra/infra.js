const Infra = require("../../models/infra/Infra");
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
const addInfra = async (req, res) => {
  const {
    code,
    name,
    date,
    salary,
    item,
    itemType,
    notes,
    buyer,
    seller,
    num,
    total,
    image,
  } = req.body;
  try {
    console.log(req.body);

    const infra = new Infra({
      code,
      name,
      date,
      salary,
      item,
      itemType,
      notes,
      buyer,
      seller,
      num,
      total,
      image,
    });
    await infra.save();
    res.status(201).send(infra);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editInfra = async (req, res) => {
  try {
    const infra = await Infra.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(infra);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteInfra = async (req, res) => {
  try {
    const infra = await Infra.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Infra deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getInfras = async (req, res) => {
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
    const infras = await Infra.find({ ...k1, ...k2 });
    res.status(201).send(infras);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addInfra,
  editInfra,
  getInfras,
  deleteInfra,
  upload,
};
