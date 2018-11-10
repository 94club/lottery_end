'use strict'

import UserModel from '../models/user'
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
  }

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
    if (username === 'eveb-admin') {
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
        redisManager.set(token)
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
            redisManager.set(token)
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
  
  async logout (req, res, next) {
    // 清楚redis中的token
    res.json({
      status: 200,
      message: '登出成功'
    })
    redisManager.remove(req)
  }

  async remainTime (req, res, next) {
    let time = new Date().getTime()
    let trueTime = new Date('2019', '0', '17', '18').getTime()
    res.json({
      status: 200,
      message: '查询成功',
      data: trueTime - time
    })
  }
}

export default new User()
