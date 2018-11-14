'use strict'

import UserModel from '../models/user'
import AwardModel from '../models/award'
import dateAndTime from 'date-and-time'
import constant from '../constant/constant'
import jsonwebtoken from 'jsonwebtoken'
import redisManager from '../config/redis'


class User {
  constructor () {
    this.login = this.login.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.logout = this.logout.bind(this)
    this.remainTime = this.remainTime.bind(this)
    this.openLottery = this.openLottery.bind(this)
    // this.getResultByUser = this.getResultByUser.bind(this)
    // this.saveRedeemNum = this.saveRedeemNum.bind(this)
    // this.getLuckyNum = this.getLuckyNum.bind(this)
    // this.deleteAwards = this.deleteAwards.bind(this)
    // this.updateLuckyNumSwitch = this.updateLuckyNumSwitch.bind(this)
    // this.getAllUser = this.getAllUser.bind(this)
  }

  /**
   *
   * @api {post} /api/login  登录
   * @apiName 登录
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 用户登录
   *
   * @apiParam {String} username 用户名
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: 'success',
   *   data: {}
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */
  async login (req, res, next) {
    let role = 0 // 0代表普通用户 1代表管理员
    let username = req.body.username
    let lang = req.body.lang
    const tokenObj = {
      username
    }
    try {
      if (!username) {
        throw new Error('用户不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    if (username === '123eveb-admin456') {
      role = 1
    }
    // 先查一遍看看是否存在
    let user = await UserModel.findOne({username})
    let token = jsonwebtoken.sign(tokenObj, constant.secretKey)
    if (user) {
      // 用户已存在 去登录
      let userInfo = await UserModel.findOne({
        username
      })
      if (userInfo) {
        redisManager.set(token, username)
        res.json({
          status: 200,
          message: '登录成功',
          data: token
        })
      } else {
        next({
          status: 0,
          message: '登录失败,用户名错误'
        })
      }
    } else {
      let arr = await UserModel.find()
      let newUser = {
        username,
        lang,
        role,
        createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        id: arr.length + 1
      }
      try {
        UserModel.create(newUser, (err) => {
          if (err) {
            next({
              status: 0,
              message: '注册失败'
            })
          } else {
            redisManager.set(token, username)
            res.json({
              status: 200,
              message: '注册成功',
              data: token
            })
          }
        })
      } catch (err) {
        next({
          status: 0,
          message: err.message
        })
      }
    }
  }

  /**
   *
   * @api {get} /user/info  用户信息
   * @apiName 用户信息
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 获取用户信息
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: 'success',
   *   data: {"avatar":"/public/img/avatar.jpg","hadPrize":false,"username":"94club","role":0,"createTime":"2018/11/10 14:24:25","id":1}}
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */
  async getUserInfo (req, res, next) {
    let userInfo = await UserModel.findOne({username: req.user.username}, {'_id': 0, '__v': 0})
    if (userInfo) {
      res.json({
        status: 200,
        message: '查询成功',
        data: userInfo
      })
    } else {
      next({
        status: 0,
        message: '查询失败'
      })
    }
  }

  /**
   *
   * @api {get} /user/logout  用户登出
   * @apiName 用户登出
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 用户登出
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: 'success'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '登出失败',
   *  }
   */  
  async logout (req, res, next) {
    // 清除redis中的token
    res.json({
      status: 200,
      message: '登出成功'
    })
    redisManager.remove(req)
  }

  /**
   *
   * @api {get} /user/remainTime  离晚会开始剩余时间
   * @apiName 离晚会开始剩余时间
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 离晚会开始剩余时间
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */
  async remainTime (req, res) {
    let currentTime = new Date().getTime()
    let prepareTime = new Date('2019', '0', '17', '18').getTime()
    let endTime = new Date('2019', '0', '17', '24').getTime()
    let time1 = prepareTime - currentTime
    let time2 = endTime - currentTime
    if (time1 < 0 && time2 > 0) {
      res.json({
        status: 200,
        message: '晚会进行中',
        data: {
          time: '',
          status: 'ing'
        }
      })
    }
    if (time1 >= 0) {
      res.json({
        status: 200,
        message: '晚会还未开始',
        data: {
          time: time1,
          status: 'prepare'
        }
      })
    }
    if (time2 <= 0) {
      res.json({
        status: 200,
        message: '晚会结束',
        data: {
          time: '',
          status: 'end'
        }
      })
    }
  }

  /**
   *
   * @api {get} /user/lotteryOpen  打开抽奖奖项开关
   * @apiName 打开抽奖奖项开关
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 打开抽奖奖项开关
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */
  async openLottery (req, res ,next) {
    let awardName = req.body.awardName
    let awardItem = await AwardModel.findOneAndUpdate({awardName}, {$set: {'isOpen': true}})
    if (awardItem) {
      res.json({
        status: 200,
        message: '更新成功'
      })
    } else {
      next({
        status: 0,
        message: '更新失败'
      })
    }
  }

}

export default new User()
