const Game = require("../../models/sports/Game");

const addGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.status(201).send(game);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

const editGame = async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(201).send(game);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(201).send("Game deleted");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const getGames = async (req, res) => {
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
          game: {
            $regex: req.query.name,
            $options: "i",
          },
        }
      : {};

    const games = await Game.find({ ...k1, ...k2 });

    res.status(201).send(games);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
module.exports = {
  addGame,
  editGame,
  getGames,
  deleteGame,
};
