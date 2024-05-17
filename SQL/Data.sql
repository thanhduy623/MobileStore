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
    pwd			varchar(100),
    actived		int,
    img			varchar(50),
    created  timestamp DEFAULT CURRENT_TIMESTAMP
);

insert into STAFF (username, fullname, email, gender, dateBirth, phone, roled, pwd, actived, img) 
values
("admin", "Quản trị viên", "admin@gmail.com", "Nam", "2004/01/01", "0000000000", "Quản lý", "$2y$10$931OhhXYyK9kXsVDJg.agOR01FaPCW1V35afsWXHCSbwCKtdADgrG", 1, "../avatar/admin.png"),
("staff", "Nhân viên", "staff@gmail.com", "Nữ", "2004/01/02", "0000000000", "Bán hàng", "$2y$10$931OhhXYyK9kXsVDJg.agOR01FaPCW1V35afsWXHCSbwCKtdADgrG", 1, "../avatar/admin.png");

create table PRODUCT
(
    idProduct	varchar(10)		PRIMARY KEY,
    nameProduct	nvarchar(50),
    cost		int,
    price		int,
    category	varchar(20),
    img			varchar(255),
    entered		int				default 0,
    selled		int				default 0,
    remain		int				default 0
);

insert into PRODUCT (idProduct, nameProduct, cost, price, category, img)
values
("IP0001", "Iphone 15 - 125GB", 15000000, 19000000, "iPhone", "../product/IP0001.png"),
("IP0002", "Iphone 15 - 125GB", 16000000, 22000000, "iPhone", "../product/IP0002.png"),
("IP0003", "Iphone 15 - 125GB", 18000000, 25000000, "iPhone", "../product/IP0003.png"),
("IP0004", "Iphone 15 - 125GB", 17000000, 29000000, "iPhone", "../product/IP0004.png"),
("MA0001", "Macbook Air M1 - 256GB", 15000000, 18000000, "Macbook", "../product/MA0001.png"),
("ID0001", "Ipad pro 11inch", 18000000, 21000000, "iPad", "../product/ID0001.png"),
("AP0001", "Airpods pro 1", 3000000, 5000000, "AirPods", "../product/AP0001.png"),
("AW0001", "Apple Watch SE 44mm", 5000000, 7000000, "Apple Watch", "../product/IP0004.png"),
("AV0001", "Apple Vision Pro", 100000000, 130000000, "Apple Vision", "../product/IP0004.png");
select * from Product


DELIMITER $$
CREATE FUNCTION generate_product_code(prefix_param VARCHAR(2)) RETURNS VARCHAR(6)
BEGIN
    DECLARE max_number INT;
    DECLARE new_code VARCHAR(10);
    
    -- Get the maximum number from the idProduct column with the corresponding prefix
    SET max_number = (SELECT MAX(CAST(SUBSTRING(idProduct, 3) AS UNSIGNED)) FROM PRODUCT WHERE SUBSTRING(idProduct, 1, 2) = prefix_param);
    
    -- If no maximum number exists, set max_number = 0
    IF max_number IS NULL THEN
        SET max_number = 0;
    END IF;
    
    -- Create a new code
    SET new_code = CONCAT(prefix_param, LPAD(max_number + 1, 4, '0'));
    
    RETURN new_code;
END$$
DELIMITER ;


create table CUSTOMER
(
    fullName	nvarchar(50),
    address		nvarchar(100),
    phone		varchar(10)			PRIMARY KEY
);

insert into CUSTOMER (fullName, address, phone) values
("Nguyễn Thanh Duy", "Kiên Giang", "0834828525"),
("Huỳnh Kiến Đông Duy", "Đồng Tháp", "0909333678"),
("Khưu Trùng Dương", "An Giang", "0364912107"),
("Nguyễn Quốc Duy", "An Giang", "0363733898");

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


insert into STAFF (username, fullname, email, gender, dateBirth, phone, roled, pwd, actived, img) 
values
(
	"admin",
	"Quản trị viên",
    "admin@gmail.com",
    "Nam",
    "2004/01/01",
    "0000000000",
    "Quản lý",
    "$2y$10$931OhhXYyK9kXsVDJg.agOR01FaPCW1V35afsWXHCSbwCKtdADgrG",
    1,
    "../avatar/admin.png"
);

select * from PRODUCT;
drop table PRODUCT