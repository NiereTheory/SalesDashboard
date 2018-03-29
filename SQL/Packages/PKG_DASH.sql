CREATE or REPLACE PACKAGE sales.pkg_dash AS
	PROCEDURE prc_get_saleskpis
	(
		ResultData Out sys_RefCursor
	);
    PROCEDURE prc_get_salesbymonth
	(
		ResultData Out sys_RefCursor
	);
    PROCEDURE prc_get_salesbyregion
	(
		ResultData Out sys_RefCursor
	);
    PROCEDURE prc_get_salesbyemployee
    (   
        v_EmployeeID number,
        ResultData Out sys_RefCursor
    );
    PROCEDURE prc_get_topsales
	(
		ResultData Out sys_RefCursor
	);
END pkg_dash;
/
GRANT EXECUTE, DEBUG ON "SALES"."PKG_DASH" to "WEBUSER";

CREATE OR REPLACE PACKAGE BODY sales.pkg_dash AS
    PROCEDURE prc_get_saleskpis(ResultData Out sys_RefCursor)
    IS BEGIN OPEN ResultData FOR
        SELECT
            Coalesce(saleRegion, 'GLOBAL') as saleRegion
            ,saleSum
            ,saleCount
        FROM 
        (
            SELECT
                r.RegionName as SALEREGION
                ,SUM(f.SaleDollars) as SALESUM
                ,COUNT(f.SaleID) as SALECOUNT
            FROM sales.fctSales f
            INNER JOIN sales.dimRegions r
            ON r.RegionID = f.fk_region
            WHERE f.ActiveFlag = 1
            GROUP BY ROLLUP (r.RegionName)
        ) 
        UNION   
        SELECT 'TARGET', 4000, 20 from dual;
    END prc_get_saleskpis;

    PROCEDURE prc_get_salesbymonth(ResultData Out sys_RefCursor)
    IS BEGIN OPEN ResultData FOR
        SELECT
            trunc(f.FK_Date, 'MM') AS SALEMONTH
            ,SUM(f.SaleDollars) AS SALESUM
        FROM fctSales f 
        WHERE f.ActiveFlag = 1
        GROUP BY trunc(f.FK_Date, 'MM')
        ORDER BY trunc(f.FK_date, 'MM');
    END prc_get_salesbymonth;

    PROCEDURE prc_get_salesbyregion(ResultData Out sys_RefCursor)
    IS BEGIN OPEN ResultData FOR
        SELECT
            r.RegionName AS SALEREGION
            ,SUM(f.SaleDollars) AS SALESUM
        FROM fctSales f
        INNER JOIN dimRegions r
        ON f.FK_Region = r.RegionID
        WHERE f.ActiveFlag = 1
        GROUP BY r.RegionName
        ORDER BY r.RegionName;
    END prc_get_salesbyregion;

    PROCEDURE prc_get_salesbyemployee
    (   
        v_EmployeeID number,
        ResultData Out sys_RefCursor
    )
    IS BEGIN OPEN ResultData FOR
        SELECT * FROM
        (
            SELECT
                e.FirstName || ' ' || e.LastName as SALEEMPLOYEE
                ,f.FK_Date as SALEDATE
                ,r.RegionName as SALEREGION
                ,f.SaleDollars as SALEAMOUNT
            FROM fctSales f
            INNER JOIN dimEmployees e
            ON f.FK_Employee = e.EmployeeID
            INNER JOIN dimRegions r
            ON f.FK_Region = r.RegionID
            WHERE e.EmployeeID = v_EmployeeID
            AND f.ActiveFlag = 1
            ORDER BY f.FK_Date DESC
        )
        WHERE rownum < 6;
    END prc_get_salesbyemployee;

    PROCEDURE prc_get_topsales(ResultData Out sys_RefCursor)
    IS BEGIN OPEN ResultData FOR
        SELECT * FROM
        (
            SELECT
                e.FirstName || ' ' || e.LastName as SALEEMPLOYEE
                ,f.FK_Date as SALEDATE
                ,r.RegionName as SALEREGION
                ,f.SaleDollars as SALEAMOUNT
            FROM fctSales f
            INNER JOIN dimEmployees e
            ON f.FK_Employee = e.EmployeeID
            INNER JOIN dimRegions r
            ON f.FK_Region = r.RegionID
            WHERE f.ActiveFlag = 1
            ORDER BY f.SaleDollars DESC
        )
        WHERE rownum < 6;
    END prc_get_topsales;
END pkg_dash;