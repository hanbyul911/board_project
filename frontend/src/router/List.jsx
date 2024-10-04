import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../component/Item";

const List = () => {
  // useState, func
  let [list, setList] = useState([]);

  // func 실행
  useEffect(() => {
    axios.get("http://localhost:3003/board/list").then((json) => {
      console.log("json=", json.data);
      setList(json.data);
    })
  },[])

  return (
    <>
      <h2>List.jsx</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
            {list.map((board, index) => 
            <Item board={board} key={index} />)}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    </>
  );
};

export default List;
