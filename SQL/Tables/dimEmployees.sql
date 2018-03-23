CREATE TABLE sales.dimEmployees
(
	EmployeeID 		number(5, 0) CONSTRAINT EmployeeID_PK Primary Key,
	EmployeeCode 	varchar2(20) not null,
	FirstName		varchar2(25) not null,
	LastName		varchar2(25) not null,
	--Other useful fields
	StartDate 		date default sysdate not null,
	EndDate 		date default to_date('20991231', 'yyyymmdd') not null,
	ActiveFlag 		char(1) default 1 not null
);

CREATE SEQUENCE sales.seqEmployeeID START WITH 1;

CREATE OR REPLACE TRIGGER sales.trgEmployeeID
BEFORE INSERT ON sales.dimEmployees
FOR EACH ROW

BEGIN
	SELECT
		sales.seqEmployeeID.nextval
	INTO :new.EmployeeID
	FROM dual;
END;
