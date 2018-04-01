CREATE or REPLACE PACKAGE sales.pkg_new_sale AS
	PROCEDURE prc_get_regions
	(
		ResultData Out sys_RefCursor
	);
	PROCEDURE prc_get_employees
	(
		ResultData Out sys_RefCursor
	);
	PROCEDURE prc_add_sale
	(
		v_Region number,
		v_Employee number,
		v_Date date,
		-- v_Product number,
		-- v_Quantity number,
		v_Dollars number,
		v_Inserted_SaleID OUT number
	);
END pkg_new_sale;
/
GRANT EXECUTE, DEBUG ON "SALES"."PKG_NEW_SALE" to "WEBUSER";

--

CREATE or REPLACE PACKAGE BODY sales.pkg_new_sale AS

	PROCEDURE prc_get_regions(ResultData Out sys_RefCursor)
		IS BEGIN
		OPEN ResultData FOR
		SELECT
			r.RegionID
			,r.RegionName
		FROM sales.dimRegions r
		WHERE r.ActiveFlag = 1
		ORDER BY r.RegionName;
	END prc_get_regions;

	PROCEDURE prc_get_employees(ResultData Out sys_RefCursor)
		IS BEGIN
		OPEN ResultData FOR
		SELECT
			e.EmployeeID
			,e.FirstName || ' ' || e.LastName as FullName
		FROM sales.dimEmployees e
		WHERE e.ActiveFlag = 1
		ORDER BY e.FirstName;
	END prc_get_employees;

	PROCEDURE prc_add_sale
		(
			v_Region number,
			v_Employee number,
			v_Date date,
			-- v_Product number,
			-- v_Quantity number,
			v_Dollars number,
			v_Inserted_SaleID OUT number
		)
		IS BEGIN
			INSERT INTO sales.fctSales (SaleID, FK_Region, FK_Employee, FK_Date, FK_Product, Quantity, SaleDollars, CreateDate, ActiveFlag)
			VALUES (null, v_Region, v_Employee, v_Date, 1, 1, v_Dollars, DEFAULT, DEFAULT)
			RETURNING SaleID INTO v_Inserted_SaleID;

			COMMIT;
	END prc_add_sale;

END pkg_new_sale;
