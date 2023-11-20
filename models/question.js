const mongoose = require('mongoose')
const questionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:['easy', 'medium', 'hard'],
        index:true,
    },
    subject:{
        type:String,
    },
    topic:{
        type:String,
    },
    marks:{
        type:Number,
    }
})

module.exports=mongoose.model('Question',questionSchema);
