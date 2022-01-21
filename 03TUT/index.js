const {print}=require('../utils');
const {format}=require('date-fns');
const {v4:uuid}=require('uuid');

print(format(new Date,"eeee yyyy-MM-dd"));
print("Hello");
print(uuid());
print(uuid());