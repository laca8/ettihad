const express = require("express");
const path = require("path");
const db = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const gameRoutes = require("./routes/sports/game");
const playerRoutes = require("./routes/sports/player");
const coachRoutes = require("./routes/sports/coach");
const prizeRoutes = require("./routes/sports/prize");
const staffRoutes = require("./routes/staff/staff");
const sponsorRoutes = require("./routes/sponsors/sponsor");
const sponsorPlayerRoutes = require("./routes/sponsors/playerSponsor");
const sponsorSportRoutes = require("./routes/sponsors/sportSponsor");
const sponsorClubRoutes = require("./routes/sponsors/clubSponsor");
const infraRoutes = require("./routes/infra/Infra");
const memberRoute = require("./routes/member/member");
const boardRoute = require("./routes/boards/board");
const lecRoute = require("./routes/lecture/lecture");
const repRoute = require("./routes/reporter/reporter");
const userRoute = require("./routes/users/users");
const app = express();
db();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));
//routes
app.use("/api/sport/game", gameRoutes);
app.use("/api/sport/player", playerRoutes);
app.use("/api/sport/coach", coachRoutes);
app.use("/api/sport/prize", prizeRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/sponsor", sponsorRoutes);
app.use("/api/player-sponsor", sponsorPlayerRoutes);
app.use("/api/sport-sponsor", sponsorSportRoutes);
app.use("/api/club-sponsor", sponsorClubRoutes);
app.use("/api/member", memberRoute);
app.use("/api/infra", infraRoutes);
app.use("/api/boards", boardRoute);
app.use("/api/lectures", lecRoute);
app.use("/api/reporters", repRoute);
app.use("/api/users", userRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at ${PORT}.....`);
});
