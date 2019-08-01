-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

-- Creates the table "products" within bamazon_db --
CREATE TABLE products (
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10, 2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cactus Jack", "Air Jordan", 250.76, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sample Lab 1500", "New Balance", 120.76, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("React 'Brutal Honey'", "NIKE", 220.76, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SB 'Walk The Dog'", "NIKE", 190.76, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Future Craft Loop", "Adidas", 300.76, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("990v5", "New Balance", 150.76, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tailwind 'TEAM ORANGE'", "NIKE", 180.76, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Yeezy Boost 350", "Adidas", 350.76, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("S/LAB XT-4 ADV", "Solomon", 165.76, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Palace Guard OG", "Puma", 185.76, 38);


