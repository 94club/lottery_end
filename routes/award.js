var express = require('express')
var router = express.Router()
import Award from '../controller/award'

router.get('/awardList', Award.getAwardsList)
router.post('/awardsAdd', Award.addAward)
router.get('/isLotteryOver', Award.getAwardItemStatus)
router.get('/getLucyNum', Award.getLucyNum)
module.exports = router