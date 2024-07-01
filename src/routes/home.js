// 데이터를 가져와 화면에 띄워

import express from 'express';
import { selectSql } from '../database/sql'; 
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await selectSql.getUser(); 

        const data = {
            main_title: 'Home Page',
            title: 'Member List',
            users: users // db
        };

        res.render('home', data); 
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Internal Server Error'); 
    }
});

export default router;
