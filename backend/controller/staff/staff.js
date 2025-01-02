const Staff = require("../../models/staff/Staff");
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
const addStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).send(staff);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(staff);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Staff deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getStaffs = async (req, res) => {
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
    const staffs = await Staff.find({ ...k1, ...k2 });
    res.status(201).send(staffs);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addStaff,
  editStaff,
  getStaffs,
  deleteStaff,
  upload,
};
