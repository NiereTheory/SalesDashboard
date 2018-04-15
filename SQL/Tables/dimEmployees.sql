CREATE TABLE sales.dimEmployees
(
	EmployeeID 		number(5, 0) CONSTRAINT Employee_PK Primary Key,
	EmployeeCode 	varchar2(20) not null,
    Pass            varchar2(255) not null,
	FirstName		varchar2(25) not null,
	LastName		varchar2(25) not null,
	--Other useful fields
	StartDate 		date default sysdate not null,
	EndDate 		date default to_date('20991231', 'yyyymmdd') not null,
	ActiveFlag 		number(1,0) default 1 not null 
	
	CONSTRAINT Employee_AF CHECK (ActiveFlag IN (0, 1))
);

-- CREATE SEQUENCE sales.seqEmployeeID START WITH 1;

-- CREATE OR REPLACE TRIGGER sales.trgEmployeeID
-- BEFORE INSERT ON sales.dimEmployees
-- FOR EACH ROW

-- BEGIN
-- 	SELECT
-- 		sales.seqEmployeeID.nextval
-- 	INTO :new.EmployeeID
-- 	FROM dual;
-- END;

Insert into DIMEMPLOYEES (EMPLOYEEID,EMPLOYEECODE,PASS, FIRSTNAME,LASTNAME,STARTDATE,ENDDATE,ACTIVEFLAG) values (1,'BN12345', '$2a$10$W3lY.jqTX5O1IRkUmYBrxOhfRair/5oJIqnrzILGVF6kavy8W.p2C', 'Ben','Niere',to_date('04-MAR-18','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');
Insert into DIMEMPLOYEES (EMPLOYEEID,EMPLOYEECODE,PASS, FIRSTNAME,LASTNAME,STARTDATE,ENDDATE,ACTIVEFLAG) values (2,'JL12345', '$2a$10$W3lY.jqTX5O1IRkUmYBrxOhfRair/5oJIqnrzILGVF6kavy8W.p2C', 'John','Levein',to_date('04-DEC-17','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');