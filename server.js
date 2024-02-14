const http = require("http");
const { Buffer } = require("buffer");
const url = require("url");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse the URL with query parameters

    const homeContent = `
    <html>
      <head>
        <title>Welcome to Edwin's Web Server</title>
      </head>
      <body>
        <h1>Welcome to Edwin's insane Web Server</h1>
        <div>
          <p>Hello, Are you ready?</p>
          <p> edit the Url Path up there </p> 
          <p> Try typing a random query </p>
          <p> like: "/custom?value=WhatEverYouWantHere" </p>  
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

    res.writeHead(200, { "Content-Type": "text/html" });

    if (parsedUrl.pathname === "/about") {
      res.end(aboutContent);
    } else if (parsedUrl.pathname === "/contact") {
      res.end(contactContent);
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === undefined) {
      const customContent = `
      <html>
        <head>
          <title>Custom Page</title>
        </head>
        <body>
          <h1>This is a custom page</h1>
          <div>
            <p>Try adding "?value=XXXXX" in the path of your URL</p>
              <p>XXXXX being any value you want, ANYTHING!</p>
          </div>
        </body>
      </html>
    `;
      res.end(customContent);
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value !== undefined) {
      const customContent = `
      <html>
        <head>
          <title>Custom Page</title>
        </head>
        <body>
          <h1>This is a custom page</h1>
          <div>
          <p> And here it goes, legend! </p> 
            <p>Our amazing server has recognized your </p>
            <p> Query parameter value: ${parsedUrl.query.value}</p>
          </div>
        </body>
      </html>
    `;
      res.end(customContent);
    } else if (parsedUrl.pathname === "/custom" && parsedUrl.query.value === "surprise") {
      const surpriseContent = ` 
         <html>
        <head>
          <title>Surprise Page</title>
        </head>
        <body>
          <h1>And here comes the ${parsedUrl.query.value} my friend!</h1>
          <div>
            <p> Let's see what happens... </p>
          </div>
        </body>
      </html>
        `;
      res.end(surpriseContent);
    } else {
      res.end(homeContent);
    }
  })
  .listen(3000);
