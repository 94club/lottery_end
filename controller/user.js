'use strict'

import UserModel from '../models/user'
import PerformModel from '../models/perform'
import FashionModel from '../models/fashion'
import DanmuModel from '../models/danmu'
import CommentModel from '../models/comment'
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
    this.getPerformList = this.getPerformList.bind(this)
    this.uploadFashionImg = this.uploadFashionImg.bind(this)
    this.commitPerformComment = this.commitPerformComment.bind(this)
    this.commitFashionComment = this.commitFashionComment.bind(this)
    this.changeCommentStatus = this.changeCommentStatus.bind(this)
    this.getCommentStatus = this.getCommentStatus.bind(this)
    this.addDanmu = this.addDanmu.bind(this)
    this.changeDanmuStatus = this.changeDanmuStatus.bind(this)
    this.getDanmuList = this.getDanmuList.bind(this)
  }

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
        let arr = await UserModel.find({})
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

  async addDanmu (req, res, next) {
    const {msg} = req.body
    const username = req.user.username
    try {
      if (!msg) {
        throw new Error('弹幕不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let info = await DanmuModel.find({})
    let id = info.length + 1
    let tempObj = {
      id,
      createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      username,
      msg,
      status: 0
    }
    info.unshift(tempObj)
    let newInfo = await DanmuModel.create(info)
    if (newInfo) {
      res.json({
        status: 200,
        message: '查询成功',
        data: id
      })
    } else {
      next({
        status: 0,
        message: '更新失败'
      })
    }
  }

  async changeCommentStatus (req, res, next) {
    const {status, id} = req.body
    let searchInfo = await CommentModel.findOne({id})
    if (!searchInfo) {
      let arr = []
      arr.push({
        id,
        status
      })
      let saveInfo = await CommentModel.create(arr)
      if (saveInfo) {
        res.json({
          status: 200,
          message: '状态添加成功'
        })
      } else {
        next({
          status: 200,
          message: '状态添加失败'
        })
      }
    } else {
      let info = await CommentModel.findOneAndUpdate({id}, {$set: {status}})
      if (info) {
        res.json({
          status: 200,
          message: '状态更新成功'
        })
      } else {
        next({
          status: 200,
          message: '状态更新失败'
        })
      }
    }
  }
  async getCommentStatus (req, res, next) {
    const id = req.query.id
    let info = await CommentModel.findOne({id}, {'_id': 0, '__v': 0})
      if (info) {
        res.json({
          status: 200,
          message: '状态获取成功',
          data: info
        })
      } else {
        next({
          status: 200,
          message: '状态获取失败'
        })
      }
  }
  async changeDanmuStatus (req, res, next) {
    const {id} = req.body
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
    let info = await DanmuModel.findOneAndUpdate({id}, {$set: {status: 1}})
    if (info) {
      res.json({
        status: 200,
        message: '弹幕状态更新成功'
      })
    } else {
      next({
        status: 200,
        message: '弹幕状态更新失败'
      })
    }
  }

  async getDanmuList (req, res, next) {
    let info = await DanmuModel.find({})
    if (info) {
      res.json({
        status: 200,
        message: '查询成功',
        data: info
      })
    } else {
      next({
        status: 200,
        message: '查询失败'
      })
    }
  }

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
 
  async logout(req, res, next) {
    // 清除redis中的token
    res.json({
      status: 200,
      message: '登出成功'
    })
    redisManager.remove(req)
  }

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
    })
  }

  async getAllUser (req, res, next) {
    let info = await UserModel.find({}, {'_id': 0, '__v': 0})
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
          message: '更新错误2'
        })
      }
    })
  }
 
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

  async commitFashionComment (req, res, next) {
    const id = req.body.id
    let username = req.user.username
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
    let updateInfo = await FashionModel.findOne({id})
    let arr = []
    if (updateInfo) {
      arr = arr.concat(updateInfo.gradeDetailList)
      arr.push({
        username
      })
    }
    let info = await FashionModel.findOneAndUpdate({id}, {$set: {'gradeDetailList': arr}})
    if (info) {
      let updateInfo = await UserModel.findOneAndUpdate({username}, {$set: {hadFashionComment: true}})
      if (updateInfo) {
        res.json({
          status: 200,
          message: '添加成功'
        })
      } else {
        next({
          status: 0,
          message: '添加失败'
        })
      }
    }
  }

  async commitPerformComment (req, res, next) {
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
    let info = await PerformModel.findOne({id}, {'_id': 0})
    let newArr = []
    let gradeDetailList = info.gradeDetailList
    if (gradeDetailList.length === 0) {
      newArr.push({username, score})
    } else {
      let changeFlag = false
      gradeDetailList.map((item) => {
        if (item.username === username) {
          item.score = score
          changeFlag = true
        }
      })
      if (!changeFlag) {
        gradeDetailList.push({username, score})
      }
      newArr = gradeDetailList
    }
    let performInfo = await PerformModel.findOneAndUpdate({id}, {$set: {"gradeDetailList": newArr}})
    if (performInfo) {
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

  async getPerformList (req, res, next) {
    let info = await PerformModel.find({}, {'_id': 0, '__v': 0})
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
}

export default new User()