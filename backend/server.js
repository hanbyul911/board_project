import e from "express";
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "board",
  port: 3306,
});

connection.connect();

app.get("/", function (req, res) {
  res.send("Hello World");
});

// app.get("/posts", function (req, res) {
//   res.send("posts data");
// });

app.get("/comments", function (req, res) {
  res.send("comments data");
});

app.get("/posts/", function (req, res) {
  connection.query("select * from posts", function (error, results) {
    if (error) {
      res
        .status(500)
        .send("서버 에러가 발생했습니다. 다시 돌아가 시도해주세요.");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("등록된 자료가 없습니다.");
      return;
    }
    res.status(200);
    res.set("Content-Type", "aaplication/json");
    let res = {};
    let jsonRes = [];
    for (const result of results) {
      let { id, title, views } = result;
      jsonRes.push(res);
    }
  });
});

app.get("/posts/:id", function (req, res) {
  // console.log(req.params);
  // console.log(req.params.id);
  // console.log(req.params["id"]);
  let { id } = req.params;
  let sql = `select * from posts where id = ?`;
  connection.query(sql, [id], function (error, results) {
    if (error) {
      res.status(500).send("서버 에러가 발생했습니다.");
      return;
    }
    if (results.length === 0) {
      res.status(404).send("자료가 없습니다.");
      return;
    }
    let { title, views } = results[0];
    res.send(`${id} : ${title} (${views}명이 조회함)`);
    console.log("The result is: ", results[0]);
  });
});

// app.get("/qs", function (req, res) {
//   console.log(req.query);
//   let { id, password } = req.query;
//   res.send(`query string id=${id} password=${password}`);
// });

app.get('/board/list', (req, res) => {
  let sql = 'select id, boardTitle, boardWriter, boardHits, createdAt from board_table';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  })
})
// requesthandler 가 콜백함수로 들어온다.
// browser로 보내면 무조건 get 요청이라 rest client 나 post 같은 도구를 이용해 확인
app.post("/board/save", (req, res) => {
  console.log("게시판 저장 요청이 들어왔습니다.");
  // res.send("/posts --- post method"); // send 하면 끝남!
  console.log(req.body);
  let { boardTitle, boardWriter, boardPwd, boardContents } = req.body.board;
  let sql = `insert into board_table(boardTitle, boardWriter, boardPwd, boardContents) values(?,?,?,?)`;
  // // mysql로 data를 저장한다.
  connection.query(sql,[boardTitle, boardWriter, boardPwd, boardContents], function (error, results) {
    if (error) res.send("저장에 실패하였습니다.");
    if (results.affectedRows === 1) {
      console.log(results.insertId + "번째 게시판 글이 등록되었습니다.");
      res.redirect("/board/list");
    }
  });
});

app.put("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { title, views } = req.body;
  // 비즈니스 로직 적용 ex.views만 업데이트 한다.
  let sql = "update posts set views = ?, title = ? where id = ?";
  connection.query(sql, [views, title, id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows == 1) {
      // console.log(res);
      console.log(results.affectedRows);
      console.log("수정이 완료되었습니다.");
    }
  });
});

app.delete("/posts/:id", (req, res) => {
  console.log(req.params);
  let {id} = req.params;
  let sql = "delete from posts where id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 1) {
      console.log("삭제처리 되었습니다.");
    }
  })
})

// 항상 마지막에!!
app.listen(3003, () => console.log("http://localhost:3003 server is ready"));
