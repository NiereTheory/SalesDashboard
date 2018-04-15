CREATE or REPLACE PACKAGE sales.pkg_login AS
	PROCEDURE prc_get_user
	(
		v_Emp_Code varchar2,
        v_Row_Found OUT varchar2
	);
END pkg_login;
/
GRANT EXECUTE, DEBUG ON "SALES"."PKG_LOGIN" to "WEBUSER";

CREATE or REPLACE PACKAGE BODY sales.pkg_login AS
	PROCEDURE prc_get_user
    (
        v_Emp_Code varchar2,
        v_Row_Found OUT varchar2
    )
		IS BEGIN
		SELECT 
            e.EmployeeID || ' ' || e.Pass
        INTO 
            v_Row_Found
        FROM sales.dimEmployees e
        WHERE e.EmployeeCode = v_Emp_Code;
	END prc_get_user;
END pkg_login;