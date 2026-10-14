const express = require("express");
const {connectToMongoDB} = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv"); 

dotenv.config();

const app = express();

connectToMongoDB();

app.set("views", "./view");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/orderRoutes"));

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});