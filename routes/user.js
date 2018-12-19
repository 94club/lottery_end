var express = require('express')
var router = express.Router()
import User from '../controller/user'

/* GET home page. */
router.get('/info', User.getUserInfo)
router.post('/logout', User.logout)
router.get('/remainTime', User.remainTime)
router.post('/updateUserInfo', User.updateUserInfo)
router.post('/uploadAvatar', User.uploadAvatar)
router.get('/getAllUser', User.getAllUser)
router.post('/uploadFashionImg', User.uploadFashionImg)
router.post('/fashionImgAdd', User.fashionImgAdd)
router.get('/getFashionImgList', User.getFashionImgList)
router.post('/commitComment', User.commitComment)
module.exports = router