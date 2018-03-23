# PROJECT OVERVIEW
This repo is designed to implement a simple full stack application using Oracle, Node, Express, and Angular.

## PREPARATION
### SOFTWARE
Download Oracle Instant Client Basic from Oracle and moved all files in folder to /usr/local/lib (note that I am on Mac)
Download SQL Developer - just a way to interact with the Oracle database
Download docker - we'll be using a simple database image from docker
Download node and install nodemon, live-server, and the angular cli
Use your favorite code editor
Have a terminal tool (even on with a code editor) as we'll likely have various processes running

### SETUP
<!--- I used AWS to spin up an oracledb that has a security group to allow inbound 1521 --->
Use docker to spin up this OracleDB instance: https://hub.docker.com/r/sath89/oracle-xe-11g/
Container started with:
> docker run -d -p 8080:8080 -p 1521:1521 --name oracledb -v /Users/benniere/Projects/Node/OraTest/Data sath89/oracle-xe-11g

# DEVELOPMENT
## BACK END
Connect to the DB instance endpoint via SQL Developer and create tables, 2 users (one for just web calls and the other for creating the DB objects), and a simple package
Ensure the web user has access to the package created by the other user, as we'll be performing db operations that way

Added Express, oracledb, body-parser

To get things running:
> docker container start [oracleDB identifier]
> nodemon app.js

Setup the config for connection, then build the routing logic in tandem with DB objects
Used Postman to validate routes (CRD) at this point

Key folder to view at this point would be /SQL and /BackEnd/routes

## FRONT END
Feel free to create a quick POC to ensure everything looks OK at this point. I made a single /FrontEnd/POC/ index file using Vue to ensure I could consume the API...

Use ng new to get an Angular 5 project created
<i>Take a look at the polyfills to assist with browser compatibility</i>

To get the live preview:
> ng serve --open

From here, I created some basic components using the Angular CLI to speed up development

Create your dashboard page, new entry page, and an about page.

Pull in font-awesome icons and a google font for style points.
Also pull in a charting library: https://valor-software.com/ng2-charts/
Setup the components with html, ts (placeholders for now), and css
Add a routing module and router outlet
Use the angular cli to either ng g c [component name] or ng g s [service name] -module=app.module