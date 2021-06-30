//ทำการ import express เข้ามาใช้งาน โดยสร้างตัวแปร express ขึ้นมาเพื่อรับค่า
const express = require('express');
const axios = require('axios');
var forms = require('forms');
var moment = require('moment'); // require
//ทำการสร้าง Instance ของ express และสร้างตัวแปร app ขึ้นมาเพื่อรับค่า
const app = express();
const path = require('path');
const router = express.Router();




var bodyParser = require('body-parser')

app.use(bodyParser.json());
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
const fs = require('fs')
const folderName = path.join(__dirname+'/test')

try {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName)
    }
    console.log("folder written successfully" +path.join(__dirname));
} catch (err) {
    console.error(err)
}

// const content = 'Some content!'

// fs.writeFile('./test/test.txt', content, err => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     //file written successfully
//     console.log("file written successfully");
// });

// fs.readFile('./test/test.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
// });


// router.get('/',function(req,res){
//     res.sendFile(path.join(__dirname+'/index.html'));
//     //__dirname : It will resolve to your project folder.
//   });
//   router.get('/index',function(req,res){
//     res.sendFile(path.join(__dirname+'/index.js'));
//     //__dirname : It will resolve to your project folder.
//   });
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
  });
  
//   app.get("/ssd", (req, res) => {
//     res.send("Thank you for subscribing");
  
//     console.log(req.query);
    
//   });
app.get('/ss', (req, res) => {
    // HTML Form
    //     res.send(`<form action="/test" method="GET">
    //     <label>Username</label><br>
    //     <input type="text" name="username" placeholder="Enter Username"><br>
    //     <label>Password</label><br>
    //     <input type="password" name="pass" placeholder="Enter Password"><br><br>
    //     <input type="submit">
    // </form>`);
    res.send(`<form action="/test" method="GET"><div class="form-group">
          <label for="msDate">Date : </label>
          <input type="datetime-local" class="form-control" id="msDate" name="msDate">
        </div>
        <div class="form-group">
          <label for="msMessage"> Message : </label>
          <input type="text" class="form-control" id="msMessage" name="msMessage">
        </div><input type="submit"></form>`);

        

});
app.get('/test', (req, res) => {

    var _msDate = moment(req.query.msDate).format('YYYYMMDDHHmm');

    //Displaying the GET data in console
    console.log(req.query);
    res.send('Check the console');
  
    fs.writeFile('./test/' + _msDate + '.txt', req.query.msMessage, err => {
        if (err) {
            console.error(err)
            return
        } else {

            //file written successfully
            console.log("file written successfully");
            
        }


    });


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
    //cron.schedule('0 01 16 * * *', function () {
    cron.schedule('*/1 * * * *', function () {
        var _Datenow = moment().format('YYYYMMDDHHmm');
        var _Datenowss = moment().format('YYYYMMDDHHmmss');
        fs.stat('./test/' + _Datenow + '.txt', (err, stats) => {
            if (err) {
                console.error(err)
                return
            } else {
                fs.readFile('./test/' + _Datenow + '.txt', 'utf8', (err, data) => {
                    if (err) {
                        //console.error(err)
                        return
                    } else {
                        axios.post('http://ec2-13-213-4-106.ap-southeast-1.compute.amazonaws.com/api/PushMsline2.php', { "to": msTo, "messages": data + '_' + moment().format('YYYYMMDDHHmmss') });
                        console.log(data + '_' + moment().format('YYYYMMDDHHmmss'));
                        const path = './test/' + _Datenow + '.txt';
                        try {
                            fs.unlinkSync(path)
                            //file removed
                        } catch (err) {
                            console.error(err)
                        }
                    }

                });
            }

        })

        if (i < 2) {
            console.log('i', i);
            // axios.post('https://pushlinems.herokuapp.com/PushMsline2.php', {"to": msTo, "messages": msMessage });
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

