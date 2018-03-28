

OPEN ResultData FOR
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
        GROUP BY ROLLUP (r.RegionName)
    )
    
    UNION
    
    SELECT 'TARGET', 4000, 20 from dual;

--

OPEN ResultData FOR
    SELECT
        trunc(f.FK_Date, 'MM') AS SALEMONTH
        ,SUM(f.SaleDollars) AS SALESUM
    FROM fctSales f 
    GROUP BY trunc(f.FK_Date, 'MM')
    ORDER BY trunc(f.FK_date, 'MM');

--

OPEN ResultData FOR
    SELECT
        r.RegionName AS SALEREGION
        ,SUM(f.SaleDollars) AS SALESUM
    FROM fctSales f
    INNER JOIN dimRegions r
    ON f.FK_Region = r.RegionID
    GROUP BY r.RegionName
    ORDER BY r.RegionName;

--

OPEN ResultData FOR
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
        WHERE e.EmployeeID = 1 --DYNAMIC LATER
        ORDER BY f.FK_Date DESC
    )
    WHERE rownum < 6;

--

OPEN ResultData FOR
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
        ORDER BY f.SaleDollars DESC
    )
    WHERE rownum < 6;