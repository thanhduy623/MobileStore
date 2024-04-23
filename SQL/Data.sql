DROP DATABASE IF EXISTS STORE;

create database STORE;
use STORE;

create table STAFF
(
	username	varchar(99)			PRIMARY KEY,
    fullname	nvarchar(50)		NOT NULL,
    email		varchar(254)		NOT NULL,
    gender		boolean				NOT NULL,
    dateBirth	date				NOT NULL,
    phone		varchar(10)			NOT NULL,
    role		varchar(10)			NOT NULL
);


create table ACCOUNT
(
	username	varchar(99)			PRIMARY KEY,
    pwd			varchar(22)			NOT NULL,
    actived		int					NOT NULL,
    
    FOREIGN KEY (username) REFERENCES STAFF(username) ON DELETE CASCADE
);


create table CUSTOMER
(
    fullName	nvarchar(50)		NOT NULL,
    gender		boolean				NOT NULL,
	dateBirth	date				NOT NULL,
    address		nvarchar(20)		NOT NULL,
    phone		varchar(10)			PRIMARY KEY
);


create table CATEGORY
(
	idCategory	varchar(8)		PRIMARY KEY,
    nameCategory nvarchar(50)	NOT NULL
);


create table PRODUCT
(
    idProduct	varchar(10)		PRIMARY KEY,
    nameProduct	nvarchar(50)	NOT NULL,
    cost		int				NOT NULL,
    price		int				NOT NULL,
    unit		nvarchar(10)	NOT NULL,
    category	varchar(6)		NOT NULL,
    image		varchar(255)	NOT NULL,
    
    FOREIGN KEY (category) REFERENCES CATEGORY(idCategory) ON DELETE CASCADE
);


create table VOUCHER
(
    idVoucher		varchar(12)		PRIMARY KEY,
    sale			int				NOT NULL,
    sDate			date			NOT NULL,
    eDate			date			NOT NULL,
    used			int				NOT NULL,
    quantity		int				NOT NULL
);


create table BILL
(
    idBill		varchar(12)		PRIMARY KEY,
    creater		varchar(99)		NOT NULL,
    customer	varchar(10)		NOT NULL,
    created		date			NOT NULL,
    momentary	int				NOT NULL,
    voucher		varchar(10)		NOT NULL,
    total		int				NOT NULL,
    
    FOREIGN KEY (creater) REFERENCES STAFF(username) ON DELETE CASCADE,
    FOREIGN KEY (customer) REFERENCES CUSTOMER(phone) ON DELETE CASCADE,
    FOREIGN KEY (voucher) REFERENCES VOUCHER(idVoucher) ON DELETE CASCADE
);


create table DETAIL 
(
	idBill		varchar(12)		PRIMARY KEY,
    idProduct	varchar(10)		NOT NULL,
    quantity	int				NOT NULL,
    sum			int				NOT NULL,
    
    FOREIGN KEY (idBill) REFERENCES BILL(idBill)
);


create table QUANTITY
(
	idProduct	varchar(10)		PRIMARY KEY,
    entered		int				NOT NULL,
    selled		int				NOT NULL,
    ordered		int				NOT NULL,
    remain		int				NOT NULL,
    
    FOREIGN KEY (idProduct) REFERENCES PRODUCT(idProduct) ON DELETE CASCADE
);

create trigger ADD_ACCOUNT
after insert on STAFF for each row
insert into ACCOUNT values (LEFT(NEW.email, LOCATE('@', NEW.email) - 1), "Abc@123", -1);