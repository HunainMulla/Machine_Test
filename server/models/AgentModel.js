const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  
    name:{ 
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    number:{ 
        type:Number,
        required:true     
    },
       country_code:{ 
        type:Number,
        required:true
    },
    password:{ 
        type:String,
        required:true
    },
    tasks:{
        type:Array,
        default:[]
    }
})
   
module.exports = mongoose.model("Agent", agentSchema);