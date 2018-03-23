CREATE TABLE sales.dimRegions
(
	RegionID 	number(2, 0) CONSTRAINT RegionID_PK Primary Key,
	RegionName 	varchar2(20) not null,
	--Other useful fields
	StartDate 	date default sysdate not null,
	EndDate 	date default to_date('20991231', 'yyyymmdd') not null,
	ActiveFlag 	char(1) default 1 not null
);

CREATE SEQUENCE sales.seqRegionID START WITH 1;

CREATE OR REPLACE TRIGGER sales.trgRegionID
BEFORE INSERT ON sales.dimRegions
FOR EACH ROW

BEGIN
	SELECT
		sales.seqRegionID.nextval
	INTO :new.RegionID
	FROM dual;
END;


-- CREATE TABLE hr.tblRegions
-- (
-- 	RegionID 	number(2, 0) CONSTRAINT RegionID_PK Primary Key,
-- 	RegionName 	varchar2(20) not null,
-- 	StartDate 	date default sysdate not null,
-- 	EndDate 	date default to_date('20991231', 'yyyymmdd') not null,
-- 	ActiveFlag 	char(1) default 1 not null
-- );
--
-- CREATE SEQUENCE hr.seqRegionID START WITH 1;
--
-- CREATE OR REPLACE TRIGGER hr.trgRegionID
-- BEFORE INSERT ON hr.tblRegions
-- FOR EACH ROW
--
-- BEGIN
-- 	SELECT
-- 		hr.seqRegionID.nextval
-- 	INTO :new.RegionID
-- 	FROM dual;
-- END;
