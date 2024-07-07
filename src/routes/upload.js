import express from 'express';
import { insertSql } from '../database/sql';

const router = express.Router(); // 라우터 정의

// get 요청
router.get('/', (req, res) => {
    res.render('upload');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    
    // 필수 입력 정보
    if (!vars.productName || !vars.productPrice || !vars.productStock || !vars.dealNumber || !vars.productInfo || !vars.discountPercentage) {
        res.send(`<script>
                    alert('정보가 누락되었습니다');
                    location.href='/upload';
                </script>`);
        return;
    }

    // 상품 정보 삽입
    try {
        await insertSql.addProduct({
            productName: vars.productName,
            productPrice: vars.productPrice,
            productStock: vars.productStock,
            dealNumber: vars.dealNumber,
            productImage: 'upload', // 이미지 처리 코드 추가해야됨
            productInfo: vars.productInfo,
            discountPercentage: vars.discountPercentage
        });
        res.redirect('/product'); // 상품 페이지로 이동
    } catch (error) {
        console.error('Err: ', error);
        res.redirect('/');
    }
});

export default router;
