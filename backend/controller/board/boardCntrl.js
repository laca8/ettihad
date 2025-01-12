const Board = require("../../models/board/Board");

const addBoard = async (req, res) => {
  try {
    const board = new Board(req.body);
    await board.save();
    res.status(201).send(board);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const editBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).send(board);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Board deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getBoards = async (req, res) => {
  try {
    const k1 = req.query.code
      ? {
          code: {
            $regex: req.query.code?.toString(),
          },
        }
      : {};

    const boards = await Board.find({ ...k1 });

    res.status(201).send(boards);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addBoard,
  editBoard,
  getBoards,
  deleteBoard,
};
