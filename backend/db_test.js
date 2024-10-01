import mysql from 'mysql';

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'board',
  port : 3306
});
 
connection.connect();
 
// 데이터를 가져오는 것은 시간이 오래 걸릴 수 있어서 비동기 작업을 한다.
connection.query('SELECT * FROM posts', function (error, results) {
  if (error) throw error;
  let {id, title, views} = results[0];
  console.log(id, title, views);

  for (const result of results) {
    console.log('The result is: ', result.id, result.title, result.views);
  }
  console.log('The result is: ', results[0]);
});
 
connection.end();