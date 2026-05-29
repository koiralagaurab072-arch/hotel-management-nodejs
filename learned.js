

let notes=require('./notes.js');
let _=require('lodash');
let age=notes.age;
console.log(age);
let fs=require('fs');
let os=require('os');

let user=os.userInfo();

fs.appendFile('greeting.txt',"hi"+user.username,()=>{console.log("File created")});
console.log(fs);


let Jasonstring='{"name":"gaurab","age":30}';
let obj=JSON.parse(Jasonstring);
console.log(obj.name);
console.log(obj);

let string=JSON.stringify(obj);
console.log(string);





