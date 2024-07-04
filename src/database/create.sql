
CREATE SCHEMA IF NOT EXISTS gongguri;

USE gongguri ;

-- users able: 사용자 정보(userId)
CREATE TABLE users (
  userId VARCHAR(10) NOT NULL,
  userPassword VARCHAR(15) NOT NULL,
  userName VARCHAR(5) NOT NULL,
  phoneNumber VARCHAR(12) NOT NULL,
  userEmail VARCHAR(40) NOT NULL,
  userAddress VARCHAR(50) NOT NULL,
  PRIMARY KEY (userId)
);

-- products Table: 상품 정보(productId, userId)
CREATE TABLE products (
  productId INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(10) NOT NULL,
  productName VARCHAR(20) NOT NULL,
  productPrice INT NOT NULL,
  productStock INT NOT NULL,
  productInfo VARCHAR(100) NULL,
  productImage VARCHAR(50) NOT NULL, -- url로 저장
  dealNumber INT NOT NULL,
  PRIMARY KEY (productId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE ON DELETE CASCADE
);

-- orders Table: 주문 정보(orderId, userId, productId)
CREATE TABLE orders (
  orderId INT NOT NULL AUTO_INCREMENT,
  userId VARCHAR(10) NOT NULL,
  productId INT NOT NULL,
  totalPrice INT NOT NULL,
  deliveryAddress VARCHAR(50) NOT NULL, -- 배송지를 수정하지 않을시, userAdress가 기본값
  productsCount INT NOT NULL,
  orderState VARCHAR(5) NOT NULL,
  orderTime TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (orderId),
  FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (productId) REFERENCES products(productId) ON UPDATE CASCADE ON DELETE CASCADE
);

-- qr Table: QR Code 정보 테이블
CREATE TABLE qr (
  qrId INT NOT NULL AUTO_INCREMENT,
  productId INT NOT NULL,
  qrImage VARCHAR(50) NOT NULL,
  discountPercentage VARCHAR(3) DEFAULT 0,
  PRIMARY KEY (qrId),
  FOREIGN KEY (productId) REFERENCES products(productId) ON UPDATE CASCADE ON DELETE CASCADE
);
