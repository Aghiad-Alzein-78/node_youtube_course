const {print}=require("../utils");
const fsPromises=require("fs").promises;
const path=require("path");


// const fileOps=async()=>{
//     try{
//         const data=await fsPromises.readFile(path.join(__dirname,"files","starter.txt"),'utf-8');
//         await fsPromises.writeFile(path.join(__dirname,'files','new.txt'),data);
//         await fsPromises.appendFile(path.join(__dirname,'files','new.txt'),"\n\nNice to meet you");
//         await fsPromises.rename(path.join(__dirname,'files','new.txt'),path.join(__dirname,'files','best.txt'));
//         await fsPromises.unlink(path.join(__dirname,'files','starter.txt'));
//     }catch(err){
//         print("There is uncaught error ");
//     }
// }
const dataGet=async()=>{
   const data= await fsPromises.readFile(path.join(__dirname,'files','lorem.txt'),'utf-8')
   print (data);
};
dataGet()

process.on('uncaughtException',err=>{
    print("There is uncaught error ");
    process.exit(1);
})
// fileOps();


// fs.readFile(path.join(__dirname,"files","starter.txt"),'utf-8',(err,data)=>{
//     if(err) throw err;
//     print(data)
// })




// fs.writeFile(path.join(__dirname,'files','reply.txt'),"Nice to meet you",(err)=>{
//     if(err)throw err;
//     print("write done");
// })
// fs.appendFile(path.join(__dirname,"files","text.txt"),"Testing text\n",err=>{
//     if(err) throw err;
//     print("append done");
//     fs.rename(path.join(__dirname,'files','text.txt'),path.join(__dirname,'files','test.txt'),err=>{
//         if(err) throw err;
//         print("Renamed Successfully");
//     });
// })
