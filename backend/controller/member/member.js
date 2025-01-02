const Member = require("../../models/member/Member");
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
const addMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const editMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Member deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getMembers = async (req, res) => {
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
    const members = await Member.find({ ...k1, ...k2 });
    res.status(201).send(members);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addMember,
  editMember,
  getMembers,
  deleteMember,
  upload,
};
