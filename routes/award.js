var express = require('express')
var router = express.Router()
import Award from '../controller/award'

router.get('/awardList', Award.getAwardsList)
router.post('/awardsAdd', Award.addAward)
module.exports = router