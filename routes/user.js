var express = require('express')
var router = express.Router()
import User from '../controller/user'

/* GET home page. */
router.get('/info', User.getUserInfo)
router.post('/logout', User.logout)
router.get('/remainTime', User.remainTime)
router.get('/awardList', User.getAwardsList)
router.post('/awardsAdd', User.addAward)
router.post('/lotteryOpen', User.openLottery)
module.exports = router