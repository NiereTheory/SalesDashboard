CREATE TABLE sales.fctSales
(
	SaleID			number(10,0) not null, --using an ID as a composite key doesn't make sense for this sample project
	FK_Region 		number(2,0) not null CONSTRAINT FK_Region REFERENCES sales.dimRegions(RegionID),
	FK_Employee 	number(5,0) not null CONSTRAINT FK_Employee REFERENCES sales.dimEmployees(EmployeeID),
	FK_Date			date DEFAULT sysdate not null , --not true reference for now...
	FK_Product		number(5,0) not null CONSTRAINT FK_Product REFERENCES sales.dimProducts(ProductID),
	--Other useful foreign keys such as date, customer, product, etc
	Quantity 		number(2,0) not null,
	SaleDollars		number(5,2) not null,
	ActiveFlag 		char(1) DEFAULT 1 not null,

	CONSTRAINT PK_SaleID Primary Key (SaleID)
);

CREATE SEQUENCE sales.seqSaleID START WITH 1;

CREATE OR REPLACE TRIGGER sales.trgSaleID
BEFORE INSERT ON sales.fctSales
FOR EACH ROW

BEGIN
	SELECT
		sales.seqSaleID.nextval
	INTO :new.SaleID
	FROM dual;
END;

--

insert into fctsales
    select null, 1, 1, to_date('20180101', 'yyyymmdd'), 1, 1, 200, 1 from dual union all
    select null, 2, 2, to_date('20180101', 'yyyymmdd'), 1, 1, 200, 1 from dual union all
    select null, 1, 2, to_date('20180201', 'yyyymmdd'), 1, 3, 600, 1 from dual union all
    select null, 2, 1, to_date('20180201', 'yyyymmdd'), 1, 1, 200, 1 from dual union all
    select null, 3, 2, to_date('20180301', 'yyyymmdd'), 1, 2, 400, 1 from dual union all
    select null, 4, 1, to_date('20180301', 'yyyymmdd'), 1, 1, 200, 1 from dual