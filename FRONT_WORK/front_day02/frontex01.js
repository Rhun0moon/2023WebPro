// front_ex01_1.html 에서 가져온 내용을 _2에 적용
$.fn.myPlugin = function(data) {
    console.log("Data : " + data);
    $(this)
        .text(data)
        .css({
            "color":"green",
            "background-color": "pink"
        });
    // 메서드 체인이 가능하도록 this를 반환
    return this;
};