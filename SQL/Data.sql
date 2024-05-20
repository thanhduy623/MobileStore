DROP DATABASE IF EXISTS STORE;

create database STORE;
use STORE;


-- NHÂN SỰ -------------------------------------------------------------------------
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



-- SẢN PHẨM -------------------------------------------------------------------------

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

insert into PRODUCT(idProduct, nameProduct, cost, price, category, img, entered, selled, remain)
values
("IP0001", "Iphone 15 - 125GB", 15000000, 19000000, "iPhone", "../product/IP0001.png", 100, 50, 50),
("IP0002", "Iphone 15 - 125GB", 16000000, 22000000, "iPhone", "../product/IP0002.png",  90, 30, 60),
("IP0003", "Iphone 15 - 125GB", 18000000, 25000000, "iPhone", "../product/IP0003.png",  50, 10, 40),
("IP0004", "Iphone 15 - 125GB", 17000000, 29000000, "iPhone", "../product/IP0004.png",  22, 12, 10),
("MA0001", "Macbook Air M1 - 256GB", 15000000, 18000000, "Macbook", "../product/MA0001.png", 35, 5, 30),
("ID0001", "Ipad pro 11inch", 18000000, 21000000, "iPad", "../product/ID0001.png", 72, 32, 40),
("AP0001", "Airpods pro 1", 3000000, 5000000, "AirPods", "../product/AP0001.png",  99, 32, 67),
("AW0001", "Apple Watch SE 44mm", 5000000, 7000000, "Apple Watch", "../product/IP0004.png", 32, 2, 30),
("AV0001", "Apple Vision Pro", 100000000, 130000000, "Apple Vision", "../product/IP0004.png", 74, 24, 50);



-- KHÁCH HÀNG -------------------------------------------------------------------------

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

-- HÓA ĐƠN -------------------------------------------------------------------------


create table BILL
(
    idBill			varchar(9)		PRIMARY KEY,
    fullname		varchar(50),
    address			varchar(100),
    phone			varchar(10),
    created			date,
    total			int,
    
    FOREIGN KEY (phone) REFERENCES CUSTOMER(phone)
);

insert into BILL values
("240518001", "Nguyễn Thanh Duy", "Kiên Giang", "0834828525", "2024/05/18", 1000000),
("240518002", "Nguyễn Quốc Duy", "Kiên Giang", "0363733898", "2024/05/18", 2000000),
("240518003", "Nguyễn Thanh Duy", "Kiên Giang", "0834828525", "2024/05/18", 3000000),
("240517001", "Khưu Trùng Dương", "Kiên Giang", "0364912107", "2024/05/17", 4000000);

-- CHI TIẾT -------------------------------------------------------------------------


create table DETAIL 
(
	idBill		varchar(12),
    idProduct	varchar(10),
    quantity	int,
	
    PRIMARY KEY (idBill, idProduct),
    FOREIGN KEY (idBill) REFERENCES BILL(idBill)
);
ALTER TABLE DETAIL
MODIFY COLUMN quantity BIGINT;
insert into DETAIL (idBill, idProduct, quantity) values 
("240518001", "IP0001", 3),
("240518001", "MA0001", 5),
("240518002", "IP0002", 3),
("240518002", "AP0001", 10);




-- ID TỰ ĐỘNG HÓA ĐƠN -------------------------------------------------------------------------
DELIMITER $

-- Tạo hàm generate_bill_code
CREATE FUNCTION generate_bill_code(prefix_param VARCHAR(6)) RETURNS VARCHAR(9)
BEGIN
    DECLARE max_number INT;
    DECLARE new_code VARCHAR(9);
    
    SET max_number = (SELECT MAX(CAST(SUBSTRING(idBill, 7) AS UNSIGNED)) FROM BILL WHERE SUBSTRING(idBill, 1, 6) = prefix_param);
    
    IF max_number IS NULL THEN
        SET max_number = 0;
    END IF;
    
    SET new_code = CONCAT(prefix_param, LPAD(max_number + 1, 3, '0'));
    RETURN new_code;
END$$
DELIMITER ;




-- ID TỰ ĐỘNG SẢN PHẨM -------------------------------------------------------------------------
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

-- THỐNG KÊ HÔM NAY -----------------------------------------------------------
DELIMITER //

CREATE PROCEDURE GetBillDetails()
BEGIN
    DECLARE current_date_prefix VARCHAR(7);
    
    -- Tạo tiền tố cho idBill từ ngày hiện tại (YYMMDD)
    SET current_date_prefix = DATE_FORMAT(CURDATE(), '%y%m%d');

    -- Truy vấn lấy các hóa đơn có idBill khớp với ngày hiện tại
    SELECT 
        b.idBill,
        COUNT(d.idBill) AS item,
        SUM(d.quantity) AS items,
        b.total,
        SUM(p.price * d.quantity - p.cost * d.quantity) AS profit,
        b.created
    FROM 
        BILL b
    JOIN 
        DETAIL d ON b.idBill = d.idBill
    JOIN 
        PRODUCT p ON d.idProduct = p.idProduct
    WHERE 
        b.idBill REGEXP CONCAT('^', current_date_prefix, '[0-9]{3}$')
    GROUP BY 
        b.idBill, b.total, b.created;
END //

DELIMITER ;

-- Gọi hàm lưu trữ để kiểm tra kết quả
-- CALL GetBillDetails();



-- THỐNG KÊ TÍCH LŨY ---------------------------------------------------------------------
DELIMITER //

CREATE PROCEDURE GetBillDetailsTime(IN startDate DATE, IN endDate DATE)
BEGIN
    -- Truy vấn lấy các hóa đơn trong khoảng thời gian từ startDate đến endDate
    SELECT 
        b.idBill,
        COUNT(d.idBill) AS item,
        SUM(d.quantity) AS items,
        b.total,
        SUM(p.price * d.quantity - p.cost * d.quantity) AS profit,
        b.created
    FROM 
        BILL b
    JOIN 
        DETAIL d ON b.idBill = d.idBill
    JOIN 
        PRODUCT p ON d.idProduct = p.idProduct
    WHERE 
        b.created BETWEEN startDate AND endDate
    GROUP BY 
        b.idBill, b.total, b.created;
END //

DELIMITER ;