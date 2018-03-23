CREATE TABLE sales.fctSales
(
	InvoiceID		number(10,0) not null, --Degenerate Dimension
	InvoiceLineID	number(12, 0) DEFAULT 1 not null,
	FK_Region 		number(2,0) not null CONSTRAINT FK_Region REFERENCES sales.dimRegions(RegionID),
	FK_Employee 	number(5,0) not null CONSTRAINT FK_Employee REFERENCES sales.dimEmployees(EmployeeID),
	FK_Date			date DEFAULT sysdate not null , --not true reference for now...
	--Other useful foreign keys such as date, customer, product, etc
	Quantity 		number(2,0) not null,
	SaleDollars		number(5,2) not null,
	ActiveFlag 		char(1) DEFAULT 1 not null,

	CONSTRAINT PK_SaleID Primary Key (InvoiceID, InvoiceLineID)
);
