import React, { useEffect, useState } from "react";
import "./App.css";

// <hr> 아래 / 할일(<li>태그, 체크박스, todo, 삭제버튼, 수정버튼) return 
function ItemRow({ item, removeItem, updateItem }) {
    const [mode, setMode] = useState(false);
    const [title, setTitle] = useState(item.title);
    return (
        <li>
        <p>
            <input
                checked={item.done ? "checked" : ""}
                type="checkbox"
                onChange={(e) => {
                    item.done = e.target.checked;
                    updateItem(item);
                }}
            />
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                onClick={(e)=>{
                    // setMode(true); //이거는 선택하면 수정할 수 있는거
                    if(!mode) {//이거는 선택하면 체크박스 클릭과 동일
                        item.done = !item.done;
                        updateItem(item);
                    }
                }}
                className={item.done ? "done" : "not-done"}
                type="text"
                // 회색이 나타나려면 item.done: false, mode: true.
                readOnly={mode&&(!item.done) ? "" : "readOnly"}
                // disabled={mode&&(!item.done) ? "" : "disabled"}
                onBlur={(e)=>{
                    item.title = title;
                    updateItem(item);
                    setMode(false);        
                }}
            />
            <button
                onClick={(e) => {
                    removeItem(item.no);
                }}
            >
                삭제
            </button>
            <button
                className={item.done ? "hidden" : "visible"}
                onClick={(e) => {
                    setMode(!mode);
                    if (mode) {
                        item.title = title;
                        updateItem(item);
                    } else {
                        
                    }
                }}
            >
                {mode ? "수정완료" : "수정"}
            </button>
        </p>
        </li>
    );
}

// <hr> 위 / 추가 input return
function InputItem({ appendItem }) {
    // input의 value로 사용 할 경우 초기값 필수.
    const [newWork, setNewWork] = useState("");
    return (
        <div>
            할 일 :
            <input
                type="text"
                value={newWork}
                onChange={(e) => {
                    setNewWork(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if(newWork){
                            appendItem(newWork);
                        }else{
                            appendItem("(내용없음)");
                        }
                        setNewWork("");
                    }
                }}
            />
            <button
                onClick={(e) => {
                    if(newWork){
                        appendItem(newWork);
                    }else{
                        appendItem("(내용없음)");
                    }
                    setNewWork("");
                }}
            >
                추가
            </button>
        </div>
    );
}

// <hr> 아래 / div > ol (ItemRoW 부름)
function TodoList({ todoList, removeItem, updateItem }) {
     return (
        <div>
        <ol type="A">
            {todoList.map((item, idx) => {
                return (
                    <ItemRow
                        key={item.no}
                        item={item}
                        removeItem={removeItem}
                        updateItem={updateItem}
                    />
                );
            })}
        </ol>
        </div>
    );
}

function App(props) {
    const [todoList, setTodoList] = useState([]);
    const [noCount, setNoCount] = useState(1);

    // useEffect 함수 = 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 HOOK
    useEffect(() => {
        // localStorage에 데이터가 있으면 로드한다.
        // 저장은 문자열로 한다.
        console.log(">>>>> useEffect ...");
        const localStorageData = localStorage.getItem("todoListData");
        if (localStorageData) {
            let objData = JSON.parse(localStorageData);
            setTodoList(objData.todoList);
            setNoCount(objData.noCount);
            console.log(">>>>> data load 완료");
            console.dir(objData);
        }
    }, []);

    // 로컬 저장소에 저장 -> 새로고침해도 데이터 안날아감
    function saveLocalStorage(newList, noCnt) {
        // Key = todoListData
        // Valuse = { todoList: [{"no":__, "title":__, "done":__}], "noCount": __ }, {}, {}, ...
        localStorage.setItem(
            "todoListData",
            JSON.stringify({ todoList: newList, noCount: noCnt }) // 저장은 문자열로 저장
        );
        console.log(">>>>> localStorage에 저장 완료");
    }

    // 입력
    function appendItem(newItem) {
        let newList = [...todoList, { no: noCount, title: newItem, done: false }];
        let noCnt = noCount + 1;
        setTodoList(newList);
        setNoCount(noCnt);
        saveLocalStorage(newList, noCnt);
    }

    // 삭제
    function removeItem(no) {
        var newList = todoList.filter((item, idx) => {
            return item.no != no;
        });
        setTodoList(newList);
        saveLocalStorage(newList, noCount);
    }


    // 수정
    function updateItem(item) {
        //console.dir("updateItem: " + JSON.stringify(item)) ;
        // const idx = todoList.findIndex((todo, idx) => {
        //   return todo.no === item.no;
        // });
        // todoList[idx] = item;
        const newList = [...todoList];
        setTodoList(newList);
        saveLocalStorage(newList, noCount);
    }

    // html
    return (
        <>
        <h1>Todo List</h1>
        <InputItem appendItem={appendItem} />
        <hr />
        <TodoList
            todoList={todoList}
            removeItem={removeItem}
            updateItem={updateItem}
        />
        </>
    );
}

export default App;