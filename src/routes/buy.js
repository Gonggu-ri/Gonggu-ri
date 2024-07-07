const express = require('express');
const { selectSql } = require('../database/sql');

const router = express.Router();

router.get('/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await selectSql.getProductById(productId);

        if (!product || product.length === 0) {
            return res.status(404).send('Product not found');
        }

        console.log(product);
        const data = {
            main_title: '상품 구매 페이지',
            productName: product[0].productName,
            productPrice: product[0].productPrice,
            productImage: product[0].productImage,
            dealNumber: product[0].dealNumber,
            productStock: product[0].productStock,

            loggedInUser: req.session.user ? req.session.user.id : null
        };
        console.log(data); // 데이터 로깅

        res.render('buy', data); // buy.hbs를 렌더링하면서 상품 정보를 전달
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
