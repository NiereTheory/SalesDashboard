CREATE or REPLACE PACKAGE sales.pkg_sales AS
	PROCEDURE prc_sel_sales
	(
		ResultData Out sys_RefCursor
	);

	PROCEDURE prc_sel_sale
		(
			v_id number,
			ResultData Out sys_RefCursor
		);

	PROCEDURE prc_add_sale
		(
			v_InvoiceID number,
			v_SaleDollars number,
			v_Inserted_InvoiceID OUT number
		);
	PROCEDURE prc_del_sale
		(
			v_InvoiceID number,
			v_InvoiceLineID number,
			v_Deleted_InvoiceID OUT number
		);
END pkg_sales;
/
GRANT EXECUTE, DEBUG ON "SALES"."PKG_SALES" to "WEBUSER";

--

CREATE or REPLACE PACKAGE BODY sales.pkg_sales AS

	PROCEDURE prc_sel_sales(ResultData Out sys_RefCursor)
		IS BEGIN
		OPEN ResultData FOR
		SELECT
			f.InvoiceID
			,f.InvoiceLineID
			,f.FK_Date
			,r.RegionName
			,f.SaleDollars
		FROM sales.fctSales f
		INNER JOIN sales.dimRegions r
		ON f.fk_region = r.RegionID
		INNER JOIN sales.dimEmployees e
		ON e.EmployeeID = f.FK_Employee;
	END prc_sel_sales;

	PROCEDURE prc_sel_sale
		(
			v_id number,
			ResultData Out sys_RefCursor
		)
		IS BEGIN
		OPEN ResultData FOR
		SELECT
			f.InvoiceID
			,f.InvoiceLineID
			,f.FK_Date
			,r.RegionName
			,f.SaleDollars
		FROM sales.fctSales f
		INNER JOIN sales.dimRegions r
		ON f.fk_region = r.RegionID
		INNER JOIN sales.dimEmployees e
		ON e.EmployeeID = f.FK_Employee
		WHERE f.invoiceLineID = v_id;
	END prc_sel_sale;

	PROCEDURE prc_add_sale
		(
			v_InvoiceID number,
			v_SaleDollars number,
			v_Inserted_InvoiceID OUT number
		)
		IS BEGIN
			INSERT INTO sales.fctSales (InvoiceID, InvoiceLineID, FK_Region, FK_Employee, FK_Date, Quantity, SaleDollars, ActiveFlag)
			VALUES (v_InvoiceID, 1, 1, 1, DEFAULT, 1, v_SaleDollars, 1)
			RETURNING InvoiceID INTO v_Inserted_InvoiceID;

			commit;

	END prc_add_sale;

	PROCEDURE prc_del_sale
		(
			v_InvoiceID number,
			v_InvoiceLineID number,
			v_Deleted_InvoiceID OUT number
		)
		IS BEGIN
			DELETE FROM sales.fctSales
			WHERE InvoiceID = v_InvoiceID
			AND InvoiceLineID = v_InvoiceLineID
			RETURNING InvoiceID INTO v_Deleted_InvoiceID;

			commit;

	END prc_del_sale;

END pkg_sales;
