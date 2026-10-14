const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        req.user = user;
        res.locals.user = user;

        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/login");
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).send("Access denied: Admin only");
    }

    next();
};