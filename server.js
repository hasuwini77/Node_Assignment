const http = require("http");
const url = require("url");
const fs = require("fs");

let surpriseArray = ["./robhulk.jpg", "./robverine.jpg", "./robyoda1.jpg", "./robyoda2.jpg"];
let surprisePic = surpriseArray[Math.floor(Math.random() * surpriseArray.length)];
http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const aboutContent = `
    <html>
      <head>
        <title>Welcome to our Insane Web Server Crew</title>
      </head>
      <body>
        <h1>Discover our Insane Web Server Crew</h1>
        <div>
          <p>Only bright-minded people allowed</p>
        </div>
      </body>
    </html>
  `;

    const contactContent = `
    <html>
      <head>
        <title>Ed Server</title>
      </head>
      <body>
        <h1>Contact our insane Crew</h1>
        <div>
          <p>Drop your e-mail below</p>
          <form action="/submit" method="post">
            <input type="email" name="email" required>
            <input type="submit" value="Submit">
          </form>
        </div>
      </body>
    </html>
  `;

    if (parsedUrl.pathname === "/about") {
      serveHtml(res, aboutContent);
    } else if (parsedUrl.pathname === "/contact") {
      serveHtml(res, contactContent);
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === "surprise") {
      serveHtmlFile(res, "surpriseContent.html");
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === undefined) {
      serveHtml(res, getUndefinedContent());
    } else if (parsedUrl.pathname === "/randomRobImage") {
      serveJpegImage(res, surprisePic);
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === "moustache") {
      serveJpegImage(res, "./RobStachBasic.jpg");
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value !== undefined) {
      serveHtml(res, getCustomContent(parsedUrl.query.value));
    } else if (parsedUrl.pathname === "/index") {
      serveHtmlFile(res, "index.html");
    } else if (parsedUrl.pathname === "/rules") {
      serveTextFile(res, "rules.txt");
    } else {
      serveHtmlFile(res, "home.html");
    }
  })
  .listen(3000);

function serveHtml(res, content) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(content);
}

function serveHtmlFile(res, fileName) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      serveError(res, 500, "Internal Server Error");
      return;
    }
    serveHtml(res, data);
  });
}

function serveTextFile(res, fileName) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      serveError(res, 500, "Internal Server Error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(data);
  });
}

function serveJpegImage(res, fileName) {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      serveError(res, 500, "Internal Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  });
}

function serveError(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.end(message);
}

function getCustomContent(value) {
  return `
    <html>
      <head>
        <title>Custom Query Page</title>
      </head>
      <body>
        <h1>This is a custom query page</h1>
        <div>
        <p> Congratulation on entering a unique and own query value! </p
        <p> I'm a smart computer, and I can read you well! </p> 
          <p>${value ? `Query parameter value: ${value}` : ""}</p>
        </div>
      </body>
    </html>
  `;
}

function getUndefinedContent() {
  return `
    <html>
      <head>
        <title>Custom Page</title>
      </head>
      <body>
        <h1>This is a custom page</h1>
        <div>
          <p>Try adding "?value=${value}" in the path of your URL</p>
        </div>
      </body>
    </html>
  `;
}

// submit?content=Yoda
