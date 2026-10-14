const express = require("express");
const path = require("path"); // Thêm path
const { connectToMongoDB } = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv"); 

dotenv.config();

const app = express();

connectToMongoDB();

// Sử dụng path.join để đường dẫn views và static hoạt động chuẩn trên Vercel
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/orderRoutes"));

// Chạy local
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

// Bắt buộc export app để Vercel serverless function hoạt động
module.exports = app;