DROP USER IF EXISTS 'nutriphi'@'localhost';
CREATE USER 'nutriphi'@'localhost' IDENTIFIED BY 'root';
DROP DATABASE IF EXISTS nutriphi;
CREATE DATABASE nutriphi;
GRANT SUPER ON *.* TO 'nutriphi'@'localhost';
GRANT ALL PRIVILEGES ON nutriphi.* TO 'nutriphi'@'localhost' WITH GRANT OPTION;