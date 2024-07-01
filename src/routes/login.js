import express from 'express';
import { selectSql } from '../database/sql';

const router = express.Router(); // 라우터 정의

// get 요청
router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const vars = req.body; // req.body에 내용을 받아와
    const users = await selectSql.getUser();

    let loginSuccess = false;

    users.map((user) => {
        if (vars.id === user.userId && vars.password === user.userPassword) {
            console.log('Login success!');
            req.session.user = { id: user.userId, checkLogin: true }; // session에 저장을 해놔
            loginSuccess = true;
        }
    });

    if (!loginSuccess) {
        console.log('Login failed!');
        res.send(`<script>
                    alert('로그인 정보가 틀렸습니다!');
                    location.href='/';
                </script>`);
    } else {
        res.redirect('/home'); // 홈페이지로 이동
    }
});

export default router;
