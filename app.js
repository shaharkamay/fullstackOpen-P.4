const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const ApiRouter = require("./routes/ApiRoute");

// mongo section
const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongoDB");
});
// mongo section
app.use(cors());
app.use(express.json());

app.use("/api", ApiRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
