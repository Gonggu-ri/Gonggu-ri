// 회원가입
// 아이디 중복 처리 후, DB에 사용자 정보 입력됨

import express from 'express';
import { insertSql, selectSql } from '../database/sql';

const router = express.Router(); // 라우터 정의

router.get('/', (req, res) => { 
    res.render('signup');
});



router.post('/', async (req, res) => {  
    try {
        const { userId, userPassword, userName, phoneNumber, userEmail, userAddress } = req.body;  //사용자 정보
        const users = await selectSql.getUser();  
        
        // 아이디 중복 검사
        const userExists = users.some(user => user.userId === userId); 
        if (userExists) {  // 존재하면
            res.send(`<script>
                        alert('아이디를 다시 설정해주세요');
                        location.href='/signup';
                    </script>`);  // 경고 메시지를 띄우고 '/signup'으로 리디렉션하는 스크립트를 클라이언트에 보냅니다.
        } else {  // 존재하지 않으면
            await insertSql.addUser({  // 새 사용자 정보 DB에 추가
                userId,
                userPassword,
                userName,
                phoneNumber,
                userEmail,
                userAddress
            });
            res.redirect('/');  
        }
    } catch (error) {  // 예외
        console.error('Error during user signup:', error);  // 에러 콘솔 출력
        res.status(500).send('Internal Server Error');  // 에러 메시지를 클라이언트 전송
    }
});

export default router;  
