// 환경변수 부르기
require('dotenv').config();

// 라우터들 정의
import express from 'express';
import logger from 'morgan';
import path from 'path';
import expressSession from 'express-session'; // 로그인 할 때 session을 활용함

import loginRouter from './routes/login.js'; // './routes/login.js'를 loginrouter로 불러와
import homeRouter from './routes/home.js';
import signupRouter from './routes/signup.js';

const PORT = 5000; // 기본값은 8000 or 5000

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    expressSession({
        secret: 'my key',
        resave: true,
        saveUninitialized: true,
    })
);

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use('/', loginRouter);
app.use('/home', homeRouter);
app.use('/signup', signupRouter); 

// 서버 시작 부분
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
