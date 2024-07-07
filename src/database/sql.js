// 백엔드
// DB에 접근하는 코드

import mysql from 'mysql2';

require("dotenv").config();

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'gongguri',
});

const promisePool = pool.promise(); // promise 기반의 pool 생성

// select query
export const selectSql = {
    getUser: async () => { // DB의 모든 사용자를 가져오는 비동기 함수
        const sql = `select * from Users`;
        const [result] = await promisePool.query(sql); // 기다림
        return result; // 반환
    },
};

// insert query : 새로운 입력 데이터를 추가함
export const insertSql = {
    addUser: async (user) => { 
        const sql = `INSERT INTO users (userId, userPassword, userName, phoneNumber, userEmail, userAddress) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [user.userId, user.userPassword, user.userName, user.phoneNumber, user.userEmail, user.userAddress]; // 사용자 정보 배열화
        const [result] = await promisePool.query(sql, values);  // 쿼리문 기다림
        return result;
    },

    addProduct: async (product) => {
        // 상품 정보
        const sql = `INSERT INTO products (productName, productPrice, productStock, dealNumber, productImage, productInfo) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [product.productName, product.productPrice, product.productStock, product.dealNumber, product.productImage, product.productInfo];
        const [result] = await promisePool.query(sql, values);

        // QR 코드 정보
        const qrSql = `INSERT INTO qr (productId, qrImage, discountPercentage) VALUES (?, ?, ?)`;
        const qrValues = [result.insertId, '', product.discountPercentage];
        await promisePool.query(qrSql, qrValues);

        return result;
    }
};
