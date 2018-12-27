var express = require('express')
var router = express.Router()
import Award from '../controller/award'

router.get('/awardList', Award.getAwardsList)
router.post('/updateAwardInfo', Award.updateAwardInfo)
router.post('/joinAward', Award.joinAward)
router.post('/awardsAdd', Award.addAward)
router.get('/getAwardItem', Award.getAwardItem)
router.get('/getLucyNum', Award.getLucyNum)
module.exports = router