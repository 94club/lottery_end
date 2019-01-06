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
router.get('/getPerformList', User.getPerformList)
router.post('/commitPerformComment', User.commitPerformComment)
router.post('/commitFashionComment', User.commitFashionComment)
router.post('/addDanmu', User.addDanmu)
router.post('/changeDanmuStatus', User.changeDanmuStatus)
router.get('/getDanmuList', User.getDanmuList)
router.post('/changeCommentStatus', User.changeCommentStatus) // 控制用户是否可以评论
router.get('/getCommentStatus', User.getCommentStatus)
module.exports = router