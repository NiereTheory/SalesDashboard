-- won't use this for initial run

CREATE TABLE sales.dimDate
(
	DateID 			number(8,0) CONSTRAINT DateID_PK Primary Key,
	DateFriendly 	date not null,
	DayNum 			number(2,0) not null,
	MonthNum 		number(2,0) not null,
	YearNum 		number(4,0) not null,
	BusinessDay 	number(1,0) not null
	--Other useful fields
)
