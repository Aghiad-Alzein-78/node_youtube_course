const fs = require("fs");
const path = require('path');

const print = (...vars) => console.log(...vars);

const createDirSync = (targetPath, dirName) => {
    if (fs.existsSync(path.join(targetPath, dirName))) {
        print("Folder Already Existed");
    } else {
        fs.mkdir(path.join(targetPath, dirName), err => {
            if (err) {
                if (err.code === 'EPERM') {
                    print("You Don't have permission to create Folder here");
                } else if (err.code === 'ENOENT') {
                    print("Wrong Path...");
                } else {
                    print(err);
                }
            }
        })
    }
}

const rmDirSync = (targetPath) => {
    if (fs.existsSync(targetPath)) {
        fs.rmdir(targetPath, err => {
            if (err) throw err;
            folderName = path.parse(targetPath).name;
            print(`${folderName} Deleted`)
        })
    }
}
//"Error Occured Unable to create Folder"
module.exports = {
    print,
    createDirSync,
    rmDirSync
}