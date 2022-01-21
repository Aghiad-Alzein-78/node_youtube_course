const fs=require("fs");
const { print } = require("../utils");
const rs=fs.createReadStream('./files/lorem.txt',{encoding:'utf-8',highWaterMark:32})

const ws=fs.createWriteStream('./files/new-lorem.txt');
// rs.on('data',(dataChunk)=>{
//     print(dataChunk,dataChunk.length)
//     ws.write(dataChunk);
// })
rs.pipe(ws)