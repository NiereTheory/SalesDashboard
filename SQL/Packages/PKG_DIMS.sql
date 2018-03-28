SELECT 'Employees' as tbl, EmployeeID as dbKey, FirstName || ' ' || LastName as dbValue
FROM dimEmployees
WHERE ActiveFlag = 1

UNION

SELECT 'Products', ProductID, ProductName
FROM dimProducts
WHERE ActiveFlag = 1

UNION

SELECT 'Regions', RegionID, RegionName
FROM dimRegions
WHERE ActiveFlag = 1;