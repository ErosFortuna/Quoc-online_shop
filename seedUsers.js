require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

async function seedUsers() {
    await mongoose.connect(process.env.MONGODB_URI);

    const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "customer", password: "customer123", role: "customer" }
    ];

    for (const item of users) {
        const password = await bcrypt.hash(item.password, 10);

        await User.findOneAndUpdate(
            { username: item.username },
            { username: item.username, password, role: item.role },
            { upsert: true, new: true }
        );
    }

    console.log("Users created");
    await mongoose.disconnect();
}

seedUsers().catch(console.error);