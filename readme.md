#ASSIGNMENT NODE JS 

Instructions
This assignment is to test your knowledge of base Node functionality, focusing on the default modules: http, url and fs.
Your task is to build a multiple page application with a server the delivers content based on the request/response protocol. The subject matter is entirely up to you, and no styling is required.
To achieve a Godkänt grade you must:
Create a webserver
Create a home page
Create content for at least 4 routes
At least two routes must render html
At least two routes must display content that comes from an external file (eg txt or html)
To achieve a Välgodkänt grade you must do the above and:

Read queries passed in the url
Generate different content based on the queries
The content should be stored in external files
The actual content, routes and queries are entirety up to you. For ease of assessment, I strongly recommend adding instructions on how to access your routes and queries to the home page. I need to know where I'm supposed to go!
Submission: gitub pages does NOT support Node, so submission will be a link to the repo. I will clone it and run it locally.

#STEPS

To Pass:
http.createServer
create a server, port number, go to safari type in localhost:portnumber, render thing from the res, use functions like end("text strings"), display it on the home page
4 Routes: home(Photos), professions,  hobbies, about 
4 files: 2 htmls(Content-type: ), txt (Content-type: text/plain, )

TO GET VÄLGODKÄNT: 

To achieve a Välgodkänt grade you must do the above and:
Read queries passed in the url
Generate different content based on the queries
The content should be stored in external files

The actual content, routes and queries are entirety up to you. For ease of assessment, I strongly recommend adding instructions on how to access your routes and queries to the home page. I need to know where I'm supposed to go!

Submission: gitub pages does NOT support Node, so submission will be a link to the repo. I will clone it and run it locally.

const url = require(`url`)
 
url: localHost:3030/about?name=whisky. Queries is ?name=whisky&category=cat
url.parse(req.url) // first url is the instance of the module from the node js which includes all the functionalities, second url is the url the client/us sent in through web browser. About is routing page name, queries start with ? 
 
If I pass in name(whisky) and category(cat), then I'd like to display a description of my cat and a picture of my cat, the content is stored in a JSON/html. I will firstly create an instance of fs
const fs = require(`fs`)
fs.readFile(catWhiskys filepath, (err, data) = > {if err, display error, else render the data from the file JSON/Html})
 
If I pass in name(Dori) and category(dog), then I would like to load a file with dog picture and dog description from ANOTHER file. 