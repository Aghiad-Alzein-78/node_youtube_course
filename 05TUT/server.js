const {logEvents}=require('./logEvents');
const EventEmitter=require('events');
const { set } = require('date-fns');
const http=require('http');
const path=require('path');
const fsPromises=require('fs').promises;
const fs=require('fs');
const { print } = require('../utils');
class MyEmitter extends EventEmitter{}
const myEmitter=new MyEmitter();

// myEmitter.on('log',(msg)=>{logEvents(msg)});
// myEmitter.emit('log','Log event emitted')

const PORT=process.env.PORT || 3500;
const server=http.createServer((req,res)=>{
    print(req.url,req.method)
    res.end("YES")
});

server.listen(PORT,'127.0.0.1',()=>print(`Server running on port ${PORT}`))