const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors')
const User = require('./models/UserModel')
const Agent = require('./models/AgentModel')    
const authRouter = require('./routes/authRoute')
const connectDB = require('./config/dbCon')
const agentRouter = require('./routes/agentRoute')
dotenv.config();

connectDB();
//middlewares
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);


app.use('/agent', agentRouter);

app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`));