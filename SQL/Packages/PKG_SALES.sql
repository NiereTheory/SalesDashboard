CREATE or REPLACE PACKAGE sales.pkg_sales AS
	PROCEDURE prc_sel_sales
	(
		ResultData Out sys_RefCursor
	);

	PROCEDURE prc_sel_sale
		(
			v_SaleID number,
			ResultData Out sys_RefCursor
		);

	PROCEDURE prc_add_sale
		(
			v_Region number,
			v_Employee number,
			v_Product number,
			v_Quantity number,
			v_Dollars number,
			v_Inserted_SaleID OUT number
		);
	PROCEDURE prc_del_sale
		(
			v_SaleID number,
			v_Deleted_SaleID OUT number
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
			f.SaleID
			,f.FK_Date
			,r.RegionName
			,p.Name
			,f.SaleDollars
		FROM sales.fctSales f
		INNER JOIN sales.dimRegions r
		ON r.RegionID = f.fk_region
		INNER JOIN sales.dimEmployees e
		ON e.EmployeeID = f.FK_Employee
		INNER JOIN sales.dimProducts p
		ON p.ProductID = f.FK_Product;
	END prc_sel_sales;

	PROCEDURE prc_sel_sale
		(
			v_SaleID number,
			ResultData Out sys_RefCursor
		)
		IS BEGIN
		OPEN ResultData FOR
		SELECT
			f.SaleID
			,f.FK_Date
			,r.RegionName
			,p.Name
			,f.SaleDollars
		FROM sales.fctSales f
		INNER JOIN sales.dimRegions r
		ON f.fk_region = r.RegionID
		INNER JOIN sales.dimEmployees e
		ON e.EmployeeID = f.FK_Employee
		INNER JOIN sales.dimProducts p
		ON p.ProductID = f.FK_Product
		WHERE f.SaleID = v_SaleID;
	END prc_sel_sale;

	PROCEDURE prc_add_sale
		(
			v_Region number,
			v_Employee number,
			v_Product number,
			v_Quantity number,
			v_Dollars number,
			v_Inserted_SaleID OUT number
		)
		IS BEGIN
			INSERT INTO sales.fctSales (SaleID, FK_Region, FK_Employee, FK_Date, FK_Product, Quantity, SaleDollars, ActiveFlag)
			VALUES (null, v_Region, v_Employee, sysdate, v_Product, v_Quantity, v_Dollars, 1)
			RETURNING SaleID INTO v_Inserted_SaleID;

			commit;

	END prc_add_sale;

	PROCEDURE prc_del_sale
		(
			v_SaleID number,
			v_Deleted_SaleID OUT number
		)
		IS BEGIN
			DELETE FROM sales.fctSales
			WHERE SaleID = v_SaleID
			RETURNING SaleID INTO v_Deleted_SaleID;

			commit;

	END prc_del_sale;

END pkg_sales;
