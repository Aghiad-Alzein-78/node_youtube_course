const fs=require('fs');
const { print } = require('../utils');
const utils=require('../utils');


utils.createDirSync('c:/Users/Aghiad','testing2');
utils.rmDirSync('c:/Users/Aghiad/testing2')