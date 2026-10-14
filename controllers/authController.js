const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
    res.render("login", { error: null });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).render("login", {
            error: "Invalid username or password"
        });
    }

    const token = jwt.sign(
        {
            id: user._id.toString(),
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000
    });

    res.redirect("/orders");
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};