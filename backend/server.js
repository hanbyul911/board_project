import express from "express";
import mysql from "mysql";

const app = express();
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

app.get("/posts", function (req, res) {
  res.send("posts data");
});

app.get("/comments", function (req, res) {
  res.send("comments data");
});

app.get("/posts/:id", function (req, res) {
  // console.log(req.params);
  // console.log(req.params.id);
  // console.log(req.params["id"]);
  let { id } = req.params;
  let sql = `select * from posts where id = ${id}`;
  connection.query(sql, function (error, results) {
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
  // res.send(id + ": posts data");
});

app.get("/qs", function (req, res) {
  // console.log(req);
  console.log(req.query);
  let { id, password } = req.query;
  res.send(`query string id=${id} password=${password}`);
});

// requesthandler 가 콜백함수로 들어온다.
// browser로 보내면 무조건 get 요청이라 rest client 나 post 같은 도구를 이용해 확인
app.post("/posts", (req, res) => {
  console.log("post 요청이 들어왔습니다.");
  // res.send("/posts --- post method"); // send 하면 끝남!
  console.log(req.body);
  let { id, title, views } = req.body;
  let sql = `insert into posts(title, views) values("${title}", ${views})`;
  // mysql로 data를 저장한다.
  connection.query(sql, function (error, results) {
    if (error) res.send("저장에 실패하였습니다.");
    // let {id, title, views} = results[0];
    // console.log(id, title, views);

    // for (const result of results) {
    //   console.log('The result is: ', result.id, result.title, result.views);
    // }
    console.log("The result is: ", results[0]);
  });

  res.send(id + "post가 저장되었습니다.");
});

app.listen(3003, () => console.log("http://localhost:3003 server is ready"));
