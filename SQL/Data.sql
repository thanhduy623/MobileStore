DROP DATABASE IF EXISTS STORE;

create database STORE;
use STORE;

create table STAFF
(
	username	varchar(50)			PRIMARY KEY,
    fullname	nvarchar(50),
    email		varchar(50)	,
    gender		nvarchar(3),
    dateBirth	date,
    phone		varchar(10)	,
    roled		varchar(10)	,
    pwd			varchar(22)	,
    actived		int,
    img			varchar(50)
);


create table CUSTOMER
(
    fullName	nvarchar(50),
    gender		boolean		,
	dateBirth	date		,
    address		nvarchar(20),
    phone		varchar(10)			PRIMARY KEY
);


create table CATEGORY
(
	idCategory	varchar(8)		PRIMARY KEY,
    nameCategory nvarchar(50)
);


create table PRODUCT
(
    idProduct	varchar(10)		PRIMARY KEY,
    nameProduct	nvarchar(50),
    cost		int,
    price		int,
    unit		nvarchar(10),
    category	varchar(6),
    image		varchar(255),
    
    FOREIGN KEY (category) REFERENCES CATEGORY(idCategory) ON DELETE CASCADE
);


create table VOUCHER
(
    idVoucher		varchar(12)		PRIMARY KEY,
    sale			int,
    sDate			date,
    eDate			date,
    used			int,
    quantity		int
);


create table BILL
(
    idBill		varchar(12)		PRIMARY KEY,
    creater		varchar(99),
    customer	varchar(10),
    created		date,
    momentary	int,
    voucher		varchar(10),
    total		int,
    
    FOREIGN KEY (creater) REFERENCES STAFF(username) ON DELETE CASCADE,
    FOREIGN KEY (customer) REFERENCES CUSTOMER(phone) ON DELETE CASCADE,
    FOREIGN KEY (voucher) REFERENCES VOUCHER(idVoucher) ON DELETE CASCADE
);


create table DETAIL 
(
	idBill		varchar(12)		PRIMARY KEY,
    idProduct	varchar(10),
    quantity	int,
    sum			int,
    
    FOREIGN KEY (idBill) REFERENCES BILL(idBill)
);


create table QUANTITY
(
	idProduct	varchar(10)		PRIMARY KEY,
    entered		int,
    selled		int,
    ordered		int,
    remain		int,
    
    FOREIGN KEY (idProduct) REFERENCES PRODUCT(idProduct) ON DELETE CASCADE
);

insert into STAFF values
(
	"nguyenduy.6203",
	"Nguyễn Thanh Duy",
    "nguyenduy.6203@gmail.com",
    "Nam",
    "2000/01/01",
    "0834828525",
    "QL",
    "a123",
    1,
    "s"
);

select * from STAFF