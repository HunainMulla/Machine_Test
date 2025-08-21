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
                tasks: agent.tasks
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


router.get('/all', async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    }
    catch (error) {
        console.error("Agent retrieval error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update tasks for an agent
router.post("/updateTasks/:id", async (req, res) => {
    try {
      const { tasks } = req.body;
      const agent = await Agent.findByIdAndUpdate(
        req.params.id,
        { tasks },
        { new: true }
      );
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.status(200).json(agent);
    } catch (error) {
      console.error("Error updating tasks:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

const agentRouter = router;
module.exports = agentRouter;