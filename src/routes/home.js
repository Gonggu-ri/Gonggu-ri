// 데이터를 가져와 화면에 띄워

import express from 'express';
import { selectSql } from '../database/sql'; 
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});


export default router;
