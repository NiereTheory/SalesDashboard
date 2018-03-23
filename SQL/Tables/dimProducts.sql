CREATE TABLE sales.dimProducts
(
	ProductID 	number(5, 0) CONSTRAINT ProductID_PK Primary Key,
	Name 		varchar2(20) not null,
	Code		varchar2(25) not null,
	Family		varchar2(25) not null,
	Cost		number(5,2) not null,
	--Other useful fields
	StartDate 		date default sysdate not null,
	EndDate 		date default to_date('20991231', 'yyyymmdd') not null,
	ActiveFlag 		char(1) default 1 not null
);

CREATE SEQUENCE sales.seqProductID START WITH 1;

CREATE OR REPLACE TRIGGER sales.trgProductID
BEFORE INSERT ON sales.dimProducts
FOR EACH ROW

BEGIN
	SELECT
		sales.seqProductID.nextval
	INTO :new.ProductID
	FROM dual;
END;
