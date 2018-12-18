var express = require('express')
var router = express.Router()
import Award from '../controller/award'

router.get('/awardList', Award.getAwardsList)
router.post('/awardsAdd', Award.addAward)
router.get('/isLotteryOver', Award.getAwardItemStatus)
router.get('/getLucyNum', Award.getLucyNum)
router.post('/updateAwardInfo', Award.updateAwardInfo)
router.post('/joinAward', Award.joinAward)
router.get('/getAwardItem', Award.getAwardItem)
module.exports = router