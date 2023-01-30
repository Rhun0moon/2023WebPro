var clickBtn = document.getElementById("clickBtn");
// id 값이 같은 요소는 없다.
var heading = document.getElementById("heading");
var aa = document.getElementsByClassName("aa");

// DOM이 선택되었는가?
console.log(clickBtn);
console.dir(clickBtn);

// 선택된 DOM요소에 이벤트 핸들러 걸기
clickBtn.onclick = function(event){
    // 클릭 이벤트가 발생하면 이벤트를 콘솔에 출력
    // console.dir(event);
    console.dir(document);
    document.bgColor = "yellow";
    document.title = "hello";
    console.log(clickBtn);
    clickBtn.style.backgroundColor = "red";
}