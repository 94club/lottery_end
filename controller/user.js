'use strict'

import UserModel from '../models/user'
import ActivityModel from '../models/activity'
import FashionModel from '../models/fashion'
import dateAndTime from 'date-and-time'
import constant from '../constant/constant'
import jsonwebtoken from 'jsonwebtoken'
import redisManager from '../config/redis'
import BaseComponent from './baseComponent'
import formidable from 'formidable'


class User extends BaseComponent{

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.logout = this.logout.bind(this)
    this.remainTime = this.remainTime.bind(this)
    this.uploadAvatar = this.uploadAvatar.bind(this)
    this.getAllUser = this.getAllUser.bind(this)
    this.getFashionImgList = this.getFashionImgList.bind(this)
    this.uploadFashionImg = this.uploadFashionImg.bind(this)
    this.commitComment = this.commitComment.bind(this)
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
   *   message: '登录/注册成功',
   *   data: {
   *     token: token
   *   }
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '失败原因',
   *  }
   */
  async login(req, res, next) {
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
    let user = await UserModel.findOne({
      username
    })
    let token = jsonwebtoken.sign(tokenObj, constant.secretKey)
    if (user) {
      // 用户已存在 去登录
      try {
        let userInfo = await UserModel.findOne({username})
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
      } catch (error) {
        
      }
    } else {
      try {
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
      } catch (error) {
        
      }
    }
  }

  /**
   *
   * @api {post} /user/getUserInfo  用户信息
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
   *   data: {"avatar":"/public/img/avatar.jpg","hadPrize":false,"username":"alistar-wang","role":0,"createTime":"2018/11/10 14:24:25","id":1}}
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */
  async getUserInfo(req, res, next) {
    let userInfo = await UserModel.findOne({
      username: req.user.username
    }, {
      '_id': 0,
      '__v': 0
    })
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
   * @api {post} /user/logout  用户登出
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
  async logout(req, res, next) {
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
  async remainTime(req, res) {
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
   * @api {post} /user/updateUserInfo  更新用户信息
   * @apiName 更新用户信息
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 更新用户信息
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
  async updateUserInfo (req, res, next) {
    const {hadPrize, prizeName} = req.body
    try {
      if (!prizeName) {
        throw new Error('中奖者不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let info = await UserModel.findOneAndUpdate({username: prizeName}, {$set: {hadPrize}})
    console.log(info)
    if (info) {
      res.json({
        status: 200,
        message: '更新数据成功'
      })
    } else {
      next({
        status: 200,
        message: '更新数据失败'
      })
    }
  }

  /**
   *
   * @api {post} /user/uploadAvatar  更新用户图像
   * @apiName 更新用户图像
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 更新用户图像
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   *   data: {
   *     imgPath: '/public/img/avatar.jpg'
   *   }
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */
  async uploadAvatar (req, res, next) {
    const form = new formidable.IncomingForm()
    let username = req.user.username
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next({
          status: 0,
          message: '表单信息错误'
        })
        return
      }
      // 获取图片链接
      let imgPath = await this.getImgPath(files, res)
      if (imgPath) {
        imgPath = '/public/img/' + imgPath
        let info = await UserModel.findOneAndUpdate({username}, {$set:{avatar: imgPath}})
        if (info) {
          res.json({
            status: 200,
            message: '头像更新成功',
            data: imgPath
          })
        } else {
          next({
            status: 0,
            message: '头像更新错误1'
          })
        }
      } else {
        next({
          status: 0,
          message: '头像更新错误2'
        })
      }
      // try {
      // } catch (err) {
      //   next({
      //     status: 0,
      //     message: '头像更新错误222'
      //   })
      // }
    })
  }

  /**
   *
   * @api {get} /user/getAllUser  获取所有用户
   * @apiName 获取所有用户
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 获取所有用户
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   *   data: [{"avatar":"/public/img/167c5b72dcb.jpg","hadPrize":false,"_id":"5c18a2a5bb5f3d1f0c994a21","username":"alistar-wang","lang":"cn","role":0,"createTime":"2018/12/18 15:32:53","id":1,"__v":0},{"avatar":"/public/img/avatar.jpg","hadPrize":false,"_id":"5c1a0c551527ab39f96293b0","username":"123eveb-admin456","lang":"cn","role":1,"createTime":"2018/12/19 17:16:05","id":2,"__v":0}]
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */
  async getAllUser (req, res, next) {
    let info = await UserModel.find({})
    if (info) {
      res.json({
        status: 200,
        message: '获取数据成功',
        data: info
      })
    } else {
      next({
        status: 0,
        message: '获取数据失败'
      })
    }
  }

  /**
   *
   * @api {post} /user/uploadFashionImg  根据id更新服装图片
   * @apiName 根据id更新服装图片
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 根据id更新服装图片
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */
  async uploadFashionImg (req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      let id = fields.id
      if (err) {
        next({
          status: 0,
          message: '表单信息错误'
        })
        return
      }
      // 获取图片链接
      let imgPath = await this.getImgPath(files, res)
      if (imgPath) {
        imgPath = '/public/img/' + imgPath
        console.log(imgPath)
        let info = await FashionModel.findOneAndUpdate({id}, {$set:{"imgSrc": imgPath}})
        if (info) {
          res.json({
            status: 200,
            message: '更新成功'
          })
        } else {
          next({
            status: 0,
            message: '更新错误'
          })
        }
      } else {
        next({
          status: 0,
          message: '头像更新错误2'
        })
      }
      // try {
      // } catch (err) {
      //   next({
      //     status: 0,
      //     message: '头像更新错误222'
      //   })
      // }
    })
  }

  /**
   *
   * @api {post} /user/fashionImgAdd  添加最佳服装
   * @apiName 添加最佳服装
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 添加最佳服装
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '添加成功',
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '添加失败原因',
   *  }
   */
  async fashionImgAdd (req, res, next) {
    let id = req.body.id
    try {
      if (!id) {
        throw new Error('序号不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let info = await FashionModel.findOne({id})
    if (info) {
      res.json({
        status: 0,
        message: '记录已存在'
      })
      return
    }
    let arr = []
    arr.push({id, imgSrc: ''})
    FashionModel.create(arr, (err) => {
      if (err) {
        next({
          status: 0,
          message: '添加失败'
        })
      } else {
        res.json({
          status: 200,
          message: '添加成功'
        })
      }
    })

  }

  /**
   *
   * @api {get} /user/getFashionImgList  获取所有最佳服装
   * @apiName 获取所有最佳服装
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 获取所有最佳服装
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '获取成功',
   *   data: []
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '获取失败原因',
   *  }
   */  
  async getFashionImgList (req, res, next) {
    let info = await FashionModel.find({}, {'_id': 0, '__v': 0})
    if (info) {
      res.json({
        status: 200,
        message: '查询成功',
        data: info
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
   * @api {post} /user/commitComment  提交评分
   * @apiName 提交评分
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 提交评分
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '评论成功',
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '评论失败原因',
   *  }
   */  
  async commitComment (req, res, next) {
    const {id, score} = req.body
    let username = req.user.username
    try {
      if (!id) {
        throw new Error('序号不能为空')
      } else if (score <= 0) {
        throw new Error('评分要大于0')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let info = await FashionModel.findOne({id}, {'_id': 0})
    let newArr = []
    if (info) {
      newArr.concat(info.gradeDetailList)
    }
    newArr.push({username, score})
    let fashionInfo = await FashionModel.findOneAndUpdate({id}, {$set: {"gradeDetailList": newArr}})
    if (fashionInfo) {
      res.json({
        status: 200,
        message: '评论成功'
      })
    } else {
      next({
        status: 0,
        message: '评论失败'
      })
    }
  }
}

export default new User()