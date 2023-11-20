const mongoose=require('mongoose');
require('dotenv').config();
module.exports.connect= async ()=>{
    await mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('connected to mongodb');
    }).catch(err => console.log(err));
}