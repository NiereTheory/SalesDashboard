--Create web user for api calls
CREATE USER webuser IDENTIFIED BY apiaccess ;
GRANT "CONNECT" TO webuser ;
ALTER USER webuser DEFAULT ROLE "CONNECT";

--main schema for tables
CREATE TABLESPACE sales
DATAFILE 'sales.dat'
SIZE 20M autoextend on;

CREATE USER sales IDENTIFIED BY sales
DEFAULT TABLESPACE sales;
GRANT ALL PRIVILEGES TO sales;

--DROP USER sales CASCADE
