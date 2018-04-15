# PROJECT OVERVIEW
This repo is designed to implement a simple full stack application representing sale data from a company where users can view a dashboard on existing sales and enter new sales. Core technologies used will be OracleDB, Node, Express, and Angular.

## PREPARATION
### SOFTWARE
Note I am on Mac...<br>
<ul>
    <li>Download Oracle Instant Client Basic from Oracle and moved all files in folder to /usr/local/lib</li>
    <li>Download SQL Developer - just a way to interact with the Oracle database</li>
    <li>Download docker - we'll be using a simple database image from docker</li>
    <li>Download node and npm install nodemon, live-server, and the angular cli - globally</li>
    <li>Use your favorite code editor (preferably one with a terminal)</li>
</ul>

### SETUP
Use docker to spin up this OracleDB instance: https://hub.docker.com/r/sath89/oracle-xe-11g/
Container can be started with:
> docker run -d -p 8080:8080 -p 1521:1521 --name oracledb -v /Users/benniere/Projects/Node/OraTest/Data sath89/oracle-xe-11g

## DEVELOPMENT
### BACK END
#### SQL
Connect to the DB instance endpoint via SQL Developer and we create:
<ul>
    <li>A couple users for i) creating objects and ii) a 'web' user with access to calling packages</li>
    <li>A few tables to represent the star schema we'll be using to store sales</li>
    <li>The packages we'll be using as the foundation of our api</li>
</ul>

#### NODE/EXPRESS
Here we want to setup our back-end routes and interact with our DB instance we defined above. Core building blocks we will build are:
<ul>
    <li>Login: Here we handle validating a user and we'll keep this simple and pre-populate users to skip signup capabilities for now</li>
    <li>Entering a sale: We will allow an authorized user to add a sale to our DB. Authentication will be used here in the form of middleware</li>
    <li>Viewing sales: Analytical views on the sales data to support the final web dashboard</li>
</ul>

### FRONT END
#### ANGULAR/WEB
Using the angular cli, we setup a project and begin building components, services, and the displayed (responsive) html/css our users will view:
<ul>
    <li>Dashboard: Generate a section for KPIs, graphs, and tables. We'll use a service to get the data and pass to the child components which will handle the styling</li>
    <li>Add a sale: Use an angular form with html5 validation to let an authenticated user add a new sale</li>
    <li>Login/Logout: With a pre-populated user, we'll let anyone login to view 'their' recent sales. Note the logout functionality will be an immediate logout as we leverage a token/user service</li>
</ul>

To get things running:
> npm install > docker container start [oracleDB identifier] > nodemon app.js (back end) > ng serve --open (front end)

<br>
Useful tools for building:
> Debug tools in chrome for both node and angular, postman for api testing, GitHub

## DEPLOYMENT (TODO)
### AWS
Leverage AWS for an RDS instance to replicate our OracleDB, wrap the node/express into claudia.js to deploy to lambda, then use an s3 static web page to serve the html