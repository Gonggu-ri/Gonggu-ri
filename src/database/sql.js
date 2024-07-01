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

const promisePool = pool.promise();

// select query
export const selectSql = {
    getUser: async () => {
        const sql = `select * from Users`;
        const [result] = await promisePool.query(sql);
        return result;
    },
};
