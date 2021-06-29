//ทำการ import express เข้ามาใช้งาน โดยสร้างตัวแปร express ขึ้นมาเพื่อรับค่า
const express = require('express');
const axios = require('axios');
var forms = require('forms');
//ทำการสร้าง Instance ของ express และสร้างตัวแปร app ขึ้นมาเพื่อรับค่า
const app = express();
const path = require('path');
const router = express.Router();
//สร้างตัวแปร PORT ขึ้นมารับค่า port ในกรณีที่เราได้กำหนดไว้ใน environment ของเครื่อง
//แต่ถ้าไม่ได้กำหนดไว้ เราจะใช้ค่า 8080 แทน
const PORT = process.env.PORT || 8080
//สร้าง route ขึ้นมา 1 ตัว โดยกำหนดให้ path คือ / หรือ index ของ host นั่นเอง
//จากนั้นให้กำหนด response แสดงคำว่า Hello World
// var fields = forms.fields;
// var validators = forms.validators;
 
// var reg_form = forms.create({
//     username: fields.string({ required: true }),
//     password: fields.password({ required: validators.required('You definitely want a password') }),
//     confirm:  fields.password({
//         required: validators.required('don\'t you know your own password?'),
//         validators: [validators.matchField('password')]
//     }),
//     email: fields.email()
// });

// app.get('/', (req, res) => res.send(
//     'Hello World1'
//     ))
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });

//run web server ที่เราสร้างไว้ โดยใช้ PORT ที่เรากำหนดไว้ในตัวแปร PORT

app.use('/', router);
app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is running on port : ${PORT}`);

    console.log('Hello World');
    var cron = require('node-cron');
    var msTo = "Cc979fb358667360d869569c072a80196";
    var msMessage = "tesssst";
    var i = 0;
    cron.schedule('0 01 16 * * *', function () {
        if(i < 2){
            console.log('i',i);
            axios.post('https://pushlinems.herokuapp.com/PushMsline2.php', {"to": msTo, "messages": msMessage });
         //   axios.post('http://ec2-13-213-4-106.ap-southeast-1.compute.amazonaws.com/api/PushMsline2.php', {"to": msTo, "messages": msMessage });
        }
       
       // console.log('running a task every minute');
        i++;
    }, {
        scheduled: true,
        timezone: "Asia/Bangkok"
      });
})
//ทำการ export app ที่เราสร้างขึ้น เพื่อให้สามารถนำไปใช้งานใน project อื่นๆ 
//เปรียบเสมือนเป็น module ตัวนึง
module.exports = app

