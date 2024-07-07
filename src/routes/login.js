const express = require('express');
const { selectSql } = require('../database/sql');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { id, password } = req.body;
    const users = await selectSql.getUser();

    let loginSuccess = false;

    users.forEach(user => {
        if (id === user.userId && password === user.userPassword) {
            console.log('Login success!');
            req.session.user = { id: user.userId, checkLogin: true };
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
        res.redirect('/home');
    }
});

module.exports = router;
