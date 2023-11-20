const express=require('express');
require('dotenv').config();
const {connect} = require('./db/db.js');
connect();


const {getQuestion,postQuestion}=require('./controllers/question');
const app=express();
app.use(express.json());
app.get('/api/v1/question',getQuestion).post('/api/v1/question',postQuestion)
app.listen(4000,() => {
    console.log("app is listening on port " +4000);
});