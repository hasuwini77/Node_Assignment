const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const homeContent = `
    <html>
      <head>
        <title>Welcome to Edwin's Web Server</title>
      </head>
      <body>
        <h1>Welcome to Edwin's insane Web Server</h1>
        <div>
          <p>Hello, Are you ready?</p>
          <p>Edit the URL Path up there</p>
          <p>Try typing a random query</p>
          <p>like: "/custom?value=WhatEverYouWantHere"</p>
        </div>
      </body>
    </html>
  `;

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
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === undefined) {
      serveHtml(res, getCustomContent());
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value !== undefined) {
      serveHtml(res, getCustomContent(parsedUrl.query.value));
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === "surprise") {
      serveHtmlFile(res, "surpriseContent.html");
    } else if (parsedUrl.pathname === "/index") {
      serveHtmlFile(res, "index.html");
    } else if (parsedUrl.pathname === "/rules") {
      serveTextFile(res, "rules.txt");
    } else {
      serveHtml(res, homeContent);
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

function serveError(res, statusCode, message) {
  res.writeHead(statusCode, { "Content-Type": "text/plain" });
  res.end(message);
}

function getCustomContent(value) {
  return `
    <html>
      <head>
        <title>Custom Page</title>
      </head>
      <body>
        <h1>This is a custom page</h1>
        <div>
          <p>Try adding "?value=${value}" in the path of your URL</p>
          <p>${value ? `Query parameter value: ${value}` : ""}</p>
        </div>
      </body>
    </html>
  `;
}
