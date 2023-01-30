const express = require('express');
const { get } = require('express/lib/response');
const app = express();

// 둘이 똑같은 거임. 쓰고싶은 거 쓰셔.
// app.get('/', function(){ ... })
// app.get('/', () => { ... })


// app.get(path, callback);
app.get('/', (req, res) => { 
    res.end("Home Page");
})

// 한글 깨짐. -> 해결방안 writeHead에 작성해야 함.
app.get('/profile', (req, res) => { 
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.end("<h1>프로필</h1>");
})

app.get('/car', (req, res) => { 
    // 쿼리스트링으로 전달된 파라미터 받아오기
    let name = req.query.name;
    let year = req.query.year;
    console.log(name, year);


    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.end("<h1>자동차 목록</h1>");
})

app.listen(3000, ()=>{
    console.log("서버 실행 중..");
})

// node index.js 로 실행하려면
// 소스 수정 후에는 창(localhost)을 끄고 재실행해야 적용이 된다.
// nodemon 모듈을 설치하고 nodemond으로 실행하면 수정 후 바로 적용된다.