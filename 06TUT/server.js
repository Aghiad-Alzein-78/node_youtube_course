const path = require('path');
const {print} = require('../utils');
const PORT = process.env.PORT || 3500;
const express=require("express");
const app=express();

app.get('^/$|/index(.html)?',(req,res)=>{
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'views','index.html'))
});
app.get('/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'))
})
app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301,'./new-page');
})

app.get('/*',(req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(PORT, '127.0.0.1', () => print(`Server running on port ${PORT}`))
//at 2:20:50