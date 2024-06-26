require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");

const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/authors", authorsRouter);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("mongoose connection successful"));

app.listen(process.env.PORT || 3000, () => {
  console.log(
    "Server is running on port: " +
      process.env.PORT +
      "\n" +
      process.env.DATABASE_URL
  );
});
