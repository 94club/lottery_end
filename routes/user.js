var express = require('express')
var router = express.Router()
import User from '../controller/user'

/* GET home page. */
router.get('/info', User.getUserInfo)
router.post('/logout', User.logout)
router.get('/remainTime', User.remainTime)
router.post('/lotteryOpen', User.openLottery)
router.post('/closeLevelLottery', User.closeLevelLottery)
router.post('/setAwardUser', User.setAwardUser)
module.exports = router