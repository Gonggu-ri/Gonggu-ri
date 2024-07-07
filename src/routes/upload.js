import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import fs from 'fs';
import { insertSql } from '../database/sql';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// AWS S3 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Multer S3 설정
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 최대 파일 크기 5MB
    }
});

// GET 요청 처리 - 파일 업로드 폼을 보여줌
router.get('/', (req, res) => {
    res.render('upload');
});

// POST 요청 처리 - 파일 업로드 처리
router.post('/', upload.single('productImage'), async (req, res) => {
    try {
        // 사용자 세션에서 userId 가져오기
        const userId = req.session.user ? req.session.user.id : null;

        if (!userId) {
            console.log('User is not logged in.');
            res.send(`<script>
                        alert('로그인이 필요합니다!');
                        location.href='/';
                      </script>`);
            return;
        }

        // 업로드된 파일을 AWS S3에 업로드
        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ACL: 'public-read'
        };

        const data = await s3.upload(uploadParams).promise();
        const productImage = data.Location; // 업로드된 파일의 S3 URL

        // 상품 정보와 함께 DB에 저장
        const { productName, productPrice, productStock, productInfo, dealNumber, qrDiscount } = req.body;

        await insertSql.addProduct({
            userId,
            productName,
            productPrice,
            productStock,
            productInfo,
            productImage,
            dealNumber,
            qrDiscount
        });

        res.redirect('/home'); // 성공적으로 업로드되었을 경우 홈 페이지로 리다이렉트
    } catch (error) {
        console.error('Error:', error);
        res.redirect('/'); // 에러 발생 시 홈 페이지로 리다이렉트
    }
});

export default router;
