const router = require('express').Router();

const { signup } = require('../controller/appController.js')

// Render laman awal
router.get('/', (req, res) => {
    res.render('index');
});

// API routes
router.post('/user/signup', signup)

module.exports = router;