'use strict'
import express from 'express'
import User from '../controller/user/user'
const router = express.Router()

router.post('/login', User.login) // 保存用户信息
router.get('/getAwardsList', User.getAwardsList) // 获取所有奖项
router.get('/userInfo/:user_id', User.getUserInfo) // 获取用户信息
router.get('/getResultByUser', User.getResultByUser)
router.post('/saveRedeemNum', User.saveRedeemNum) // 保存开奖结果
router.post('/getLuckyNum', User.getLuckyNum) // 获取抽奖号码
router.post('/addAwards', User.addAwards) // 新增奖项
router.post('/deleteAwards', User.deleteAwards) // 新增奖项
router.post('/updateLuckyNumSwitch', User.updateLuckyNumSwitch) // 更新抽奖开关
router.get('/getAllUser', User.getAllUser) // 获取所有用户

export default router
