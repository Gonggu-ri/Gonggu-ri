-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS gongguri;
-- -----------------------------------------------------
-- Schema gongguri
-- -----------------------------------------------------
USE gongguri ;

-- -----------------------------------------------------
-- Table gongguri.users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gongguri.users (
  userId VARCHAR(30) NOT NULL,
  userPassword VARCHAR(45) NOT NULL,
  userName VARCHAR(20) NOT NULL,
  userNumber VARCHAR(30) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userAddress VARCHAR(400) NOT NULL,
  PRIMARY KEY (userId)
);

-- -----------------------------------------------------
-- Table gongguri.products
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gongguri.products (
  productId INT NOT NULL AUTO_INCREMENT,
  users_userId VARCHAR(30) NOT NULL,
  productName VARCHAR(50) NOT NULL,
  productPrice VARCHAR(35) NOT NULL,
  productStock INT NOT NULL,
  productInfo VARCHAR(1000) NOT NULL,
  productImage VARCHAR(200) NOT NULL,
  dealNumber INT NOT NULL,
  PRIMARY KEY (productId),
  FOREIGN KEY (users_userId) REFERENCES gongguri.users (userId)
);

-- -----------------------------------------------------
-- Table gongguri.orders
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gongguri.orders (
  orderId INT NOT NULL AUTO_INCREMENT,
  users_userId VARCHAR(30) NOT NULL,
  products_productId INT NOT NULL,
  totalPrice INT NOT NULL,
  deliveryAddress VARCHAR(400) NOT NULL,
  productsCount INT NOT NULL,
  orderState VARCHAR(30) NOT NULL,
  PRIMARY KEY (orderId),
  FOREIGN KEY (users_userId) REFERENCES gongguri.users (userId),
  FOREIGN KEY (products_productId) REFERENCES gongguri.products (productId)
);

-- -----------------------------------------------------
-- Table gongguri.qr
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gongguri.qr (
  qrId INT NOT NULL AUTO_INCREMENT,
  products_productId INT NOT NULL,
  qrImage VARCHAR(200) NOT NULL,
  discountPercentage VARCHAR(45) NOT NULL,
  PRIMARY KEY (qrId),
  FOREIGN KEY (products_productId) REFERENCES gongguri.products (productId)
);
