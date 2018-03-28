CREATE TABLE sales.dimProducts
(
	ProductID 		number(5, 0) CONSTRAINT Product_PK Primary Key,
	ProductName 	varchar2(20) not null,
	Code			varchar2(25) not null,
	Family			varchar2(25) not null,
	Cost			number(5,2) not null,
	--Other useful fields
	StartDate 		date default sysdate not null,
	EndDate 		date default to_date('20991231', 'yyyymmdd') not null,
	ActiveFlag 		number(1,0) default 1 not null

	CONSTRAINT Product_AF CHECK (ActiveFlag IN (0, 1))
);

-- CREATE SEQUENCE sales.seqProductID START WITH 1;

-- CREATE OR REPLACE TRIGGER sales.trgProductID
-- BEFORE INSERT ON sales.dimProducts
-- FOR EACH ROW

-- BEGIN
-- 	SELECT
-- 		sales.seqProductID.nextval
-- 	INTO :new.ProductID
-- 	FROM dual;
-- END;

Insert into DIMPRODUCTS (PRODUCTID,NAME,CODE,FAMILY,COST,STARTDATE,ENDDATE,ACTIVEFLAG) values (1,'ProductA','123a','Hoops',200,to_date('22-FEB-18','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');
