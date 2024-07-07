const express = require('express');
const { selectSql } = require('../database/sql');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let products = [];

        if (req.query.productName) {
            products = await selectSql.searchProductByName(req.query.productName);
        } else {
            products = await selectSql.getAllProducts();
        }

        const data = {
            main_title: '공구리',
            title: '판매중인 상품',
            products: products,
            loggedInUser: req.session.user ? req.session.user.id : null
        };

        res.render('home', data); // Handlebars 템플릿을 렌더링
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/search', async (req, res) => {
    try {
        let products = [];

        if (req.query.productName) {
            products = await selectSql.searchProductByName(req.query.productName);
        } else {
            products = await selectSql.getAllProducts();
        }

        res.json(products); // JSON 형태로 데이터 전송
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
