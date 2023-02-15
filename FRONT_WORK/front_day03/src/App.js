import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [personList, setPersonList] = useState([]);
  useEffect( ()=> {
    // axios 모듈을 활용한 Ajax 처리
    axios.get("http://localhost:5000/car").then((response)=>{
      setPersonList(response.data);
    });
  }, []);

  return (
    <div>
      <h1>길동이의 홈페이지</h1>
      <Test />
      <ul>
        {
          personList.map((person)=>{
            return <li key={person.no}>{person.name}, {person.company}, {person.year}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;