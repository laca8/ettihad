const Lecture = require("../../models/lecture/Lecture");

const addLecture = async (req, res) => {
  try {
    const lec = new Lecture(req.body);
    await lec.save();
    res.status(201).send(lec);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const editLecture = async (req, res) => {
  try {
    const lec = await Lecture.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(lec);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteLecture = async (req, res) => {
  try {
    const lec = await Lecture.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Lec deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getLectures = async (req, res) => {
  try {
    const k1 = req.query.code
      ? {
          code: {
            $regex: req.query.code?.toString(),
          },
        }
      : {};

    const lecs = await Lecture.find({ ...k1 });

    res.status(201).send(lecs);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addLecture,
  editLecture,
  getLectures,
  deleteLecture,
};
