const express = require('express');
const router = express.Router();
const { adminLogin, profile , logout, signup } = require('../controllers/admin.controller'); 
const {authGuard} = require('../guard/authGuard.guard');
const { restricGuard } = require('../guard/restric.guard');

router.route('/signup')
                .post( authGuard , restricGuard("admin") , signup)
router.route('/login')
                .post(adminLogin);
router.route('/profile')
                .get(authGuard, profile);
router.route('/logout')
        .post(authGuard , logout)
module.exports = router;