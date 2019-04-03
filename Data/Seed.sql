INSERT INTO sellers (first_name, last_name, hire_date)
VALUES
( 'Ben', 'Niere', current_date),
( 'Bob', 'Jones', current_date),
( 'Cathy', 'Nicks', current_date - 2),
( 'Don', 'Lull', current_date - 5),
( 'Eliz', 'Cazh', current_date - 10);

--

INSERT INTO regions (short_name, long_name)
VALUES
('NAM', 'North America'),
('ASPAC', 'Asia Pacific'),
('LATAM', 'Latin America'),
('EMEA', 'Europe Middle East');

--

INSERT INTO sales(amount, sale_date, fk_region, fk_seller)
VALUES
(1000.23, current_date, 4, 3);
