const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Signup request body:", req.body);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with all fields
        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        if(email=="admin@gmail.com" && password=="admin"){
            const newUser = await User.create({
                email,
                password: hashedPassword,
                isAdmin:true
            });
            const token = jwt.sign({ email: newUser.email, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);


            console.log("Token generated:", token);
            res.status(201).json({
                message: "User created successfully",
                token: token,
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin
                }
            });
            return;
        }
        
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        // Generate JWT token using the new user's email
        const token = jwt.sign({ email: newUser.email, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
        console.log("Token generated:", token);
        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                id: newUser._id,
                email: newUser.email,
                isAdmin: newUser.isAdmin

            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }

    // const{email,password} =req.body;
    // console.log("Signup request body:", req.body);
    // console.log("User email and password = ", email, password);

});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request body:", req.body);
        console.log("User email and password = ", email, password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

router.get("/delete", async (req, res) => {
    await User.deleteMany({});
    res.send("All users deleted");
});

router.get("/test", async(req, res) => {
    
    const user = await User.find({})
    res.json(user)

});


const authRouter = router;
module.exports = authRouter;