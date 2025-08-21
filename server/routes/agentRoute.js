const express = require('express');
const router = express.Router();
const Agent = require('../models/AgentModel');

router.post('/create', async (req, res) => {
    const { name, email, number, country_code, password } = req.body;

    const isAgent = await Agent.findOne({ email });
    if (isAgent) {
        return res.status(400).json({ message: "Agent already exists" })
    }

    try {
        const agent = await Agent.create({
            name,
            email,
            number,
            country_code,
            password
        });

        res.status(201).json({
            message: "Agent created successfully",
            agent: {
                id: agent._id,
                name: agent.name,
                email: agent.email,
                number: agent.number,
                country_code: agent.country_code,
                password: agent.password
            }
        });

    } catch (error) {
        console.error("Agent creation error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});




router.get('/deleteAll', async (req, res) => {
    await Agent.deleteMany({});
    res.send("All agents deleted");
});

router.get('/test', (req, res) => {
    res.send("Hello World");
});
