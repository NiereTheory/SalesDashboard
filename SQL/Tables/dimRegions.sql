CREATE TABLE sales.dimRegions
(
	RegionID 	number(2, 0) CONSTRAINT Region_PK Primary Key,
	RegionName 	varchar2(20) not null,
	--Other useful fields
	StartDate 	date default sysdate not null,
	EndDate 	date default to_date('20991231', 'yyyymmdd') not null,
	ActiveFlag 		number(1,0) default 1 not null 
	
	CONSTRAINT Region_AF CHECK (ActiveFlag IN (0, 1))
);

-- CREATE SEQUENCE sales.seqRegionID START WITH 1;

-- CREATE OR REPLACE TRIGGER sales.trgRegionID
-- BEFORE INSERT ON sales.dimRegions
-- FOR EACH ROW

-- BEGIN
-- 	SELECT
-- 		sales.seqRegionID.nextval
-- 	INTO :new.RegionID
-- 	FROM dual;
-- END;

Insert into DIMREGIONS (REGIONID,REGIONNAME,STARTDATE,ENDDATE,ACTIVEFLAG) values (1,'ASPAC',to_date('01-JAN-18','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');
Insert into DIMREGIONS (REGIONID,REGIONNAME,STARTDATE,ENDDATE,ACTIVEFLAG) values (2,'EMEA',to_date('01-JAN-18','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');
Insert into DIMREGIONS (REGIONID,REGIONNAME,STARTDATE,ENDDATE,ACTIVEFLAG) values (3,'LATAM',to_date('01-JAN-18','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');
Insert into DIMREGIONS (REGIONID,REGIONNAME,STARTDATE,ENDDATE,ACTIVEFLAG) values (4,'NAM',to_date('01-JAN-18','DD-MON-RR'),to_date('31-DEC-99','DD-MON-RR'),'1');