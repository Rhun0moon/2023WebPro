const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const formidable = require('formidable'); // npm i -S formidable
const fs = require("fs");

// app.set("key", "value"): setAttribute 용도로 사용
// app.get("key"): getAttribute 용도로 사용
// app.get("path", 콜백함수): 서버의 doGet 역할
// app.post("path", 콜백함수): 서버의 doPost 역할

app.set("port", 3000);
//console.dir(app);

app.set("view engine", "ejs");
app.set("views", __dirname + "/template"); //__dirname은 현재 실행 중인 폴더 경로 

app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res)=>{
    res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    res.write("<h1>Hello world</h1>");
    res.end();
});

app.post("/person/input", (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.dir(fields);
        var oldpath = files.photo.filepath; //photo는 html 파일에서 보내는 file의 name 
        var newpath = 'C:/Users/User/upload/' + files.photo.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
});


// http와 express의 결합 - 같은 port를 공유한다
const server = http.createServer(app);
server.listen(app.get("port"), ()=>{
    console.log("서버 실행 중 - http://localhost:"+ app.get("port") );
});