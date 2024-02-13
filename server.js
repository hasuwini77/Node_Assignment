const http = require("http");

http
  .createServer((req, res) => {
    res.write("Welcome to Edwin's new Web Server!");
    res.end();
  })
  .listen(3000);
