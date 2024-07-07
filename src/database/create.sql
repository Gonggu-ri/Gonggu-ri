CREATE DATABASE IF NOT EXISTS gongguri;

USE gongguri ;

-- users able: 사용자 정보(userId)
CREATE TABLE users (
  userId VARCHAR(15) NOT NULL,
  userPassword VARCHAR(20) NOT NULL,
  userName VARCHAR(10) NOT NULL,
  phoneNumber VARCHAR(15) NOT NULL,
  userEmail VARCHAR(40) NOT NULL,
  userAddress VARCHAR(70) NOT NULL,
  PRIMARY KEY (userId)
);

-- products Table: 상품 정보(productId, userId)
CREATE TABLE products (
  productId INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(15) NOT NULL,
  productName VARCHAR(30) NOT NULL,
  productPrice INT NOT NULL,
  productStock INT NOT NULL,
  productInfo VARCHAR(100) NULL,
  productImage VARCHAR(200), -- url로 저장
  dealNumber INT NOT NULL,
  qrDiscount VARCHAR(3) DEFAULT 0,
  PRIMARY KEY (productId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE ON DELETE CASCADE
);

-- orders Table: 주문 정보(orderId, userId, productId)
CREATE TABLE orders (
  orderId INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(15) NOT NULL,
  productId INT NOT NULL,
  totalPrice INT NOT NULL,
  deliveryAddress VARCHAR(70) NOT NULL, -- 배송지를 수정하지 않을시, userAdress가 기본값으로 입력됨
  productsCount INT NOT NULL,
  orderState VARCHAR(15) NOT NULL,
  orderTime TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (orderId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(productId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE qr (
  qrId INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  qrImage VARCHAR(50) NOT NULL,
  PRIMARY KEY (qrId),
  FOREIGN KEY (productId) REFERENCES products(productId) ON UPDATE CASCADE ON DELETE CASCADE
);