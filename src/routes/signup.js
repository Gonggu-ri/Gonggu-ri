import express from 'express';
import { insertSql, selectSql } from '../database/sql';

const router = express.Router(); // 라우터 정의

router.get('/', (req, res) => { 
    res.render('signup');
});


router.post('/check', async (req, res) => {
    try {
        const { userId } = req.body;
        const users = await selectSql.getUser();  

        const userExists = users.some(user => user.userId === userId);

        res.json({ exists: userExists });
        
    } catch (error) {
        console.error('Err:', error);
        res.status(500).json({ exists: false });
    }
});

router.post('/', async (req, res) => {  
    try {
        const { userId, userPassword, userName, phoneNumber, userEmail, userAddress } = req.body;
        const users = await selectSql.getUser();  
        const userExists = users.some(user => user.userId === userId);
        
        if (userExists) {
            res.send(`<script>
                        alert('아이디를 다시 설정해주세요');
                        location.href='/signup';
                    </script>`);
        } else {
            await insertSql.addUser({  
                userId,
                userPassword,
                userName,
                phoneNumber,
                userEmail,
                userAddress
            });
            res.redirect('/');  
        }
    } catch (error) {
        console.error('Err: ', error);
        res.redirect('/'); 
    }
});

export default router;  
