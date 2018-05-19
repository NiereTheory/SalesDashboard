# PROJECT OVERVIEW

This repo is designed to implement a simple full stack application representing a sales data warehouse for a company wanting to give visibility to its staff. Core technologies used will be OracleDB, Node, Express, and Angular.

## PREPARATION

### SOFTWARE

Note I am on Mac...<br>
Download Oracle Instant Client Basic from Oracle (moved all files in folder to /usr/local/lib), SQL Developer, docker, node + npm, and your favorite code editor

### SETUP

Use docker to spin up this OracleDB instance: https://hub.docker.com/r/sath89/oracle-xe-11g/
Container can be started with:

> docker run -d -p 8080:8080 -p 1521:1521 --name oracledb -v [full local path]:sath89/oracle-xe-11g

## DEVELOPMENT

### BACK END

#### SQL

Connect to the DB instance endpoint via SQL Developer and we create:

<ul>
    <li>A couple users for i) creating objects and ii) a 'web' user with access to calling packages</li>
    <li>A few tables to represent the star schema we'll be using to store sales</li>
    <li>The packages we'll be using as the foundation of our api</li>
</ul>

Since we're mocking a data warehouse, our star schema should look as such:<br>
![Schema Design](/ReadMeHelper/schema.png?raw=true)

#### NODE/EXPRESS

Here we want to setup our back-end routes and interact with our DB instance we defined above. Core building blocks we will build are:

<ul>
    <li>Login: Here we handle validating a user and we'll keep this simple and pre-populate users to skip signup capabilities for now</li>
    <li>Entering a sale: We will allow an authorized user to add a sale to our DB - authentication will be used here in the form of middleware</li>
    <li>Viewing sales: Analytical views on the sales data to support the final web dashboard</li>
</ul>

### FRONT END

#### ANGULAR/WEB

Using the angular cli, we setup a project and begin building components, services, and the displayed (responsive) html/css our users will view:

Dashboard: <br>
![Dashboard Page](/ReadMeHelper/dashboardpage.png?raw=true) <br><br>
Sales entry: <br>
![Sales Entry Page](/ReadMeHelper/salesentry.png?raw=true) <br><br>
Login / Logout: <br>
simple forms re-using the custom CSS seen in the sales entry form

To get things running:

> npm install > docker container start [oracleDB identifier] > nodemon app.js (back end) > ng serve --open (front end)

<br>
Useful tools for building:
> Debug tools in chrome for both node and angular, postman for api testing, GitHub

## TODO

### UNIT TESTING

Build unit tests into both the back and front end elements to ensure data/views are displaying as expected across the board.

### AWS DEPLOYMENT

Leverage AWS for an RDS instance to replicate our OracleDB, wrap the node/express into claudia.js to deploy to lambda, then use an s3 static web page to serve the html
