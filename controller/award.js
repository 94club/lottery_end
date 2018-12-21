'use strict'

import AwardModel from '../models/award'
import dateAndTime from 'date-and-time'
import formidable from 'formidable'
import BaseComponent from './baseComponent';

class Award extends BaseComponent{

  constructor () {
    super()
    this.getAwardsList = this.getAwardsList.bind(this)
    this.addAward = this.addAward.bind(this)
    this.updateAwardInfo = this.updateAwardInfo.bind(this)
    this.joinAward = this.joinAward.bind(this)
    this.getLucyNum = this.getLucyNum.bind(this)
    this.getAwardItem = this.getAwardItem.bind(this)
  }

  /**
   *
   * @api {get} /award/getAwardsList  获取奖项列表
   * @apiName 获取奖项列表
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 获取奖项列表
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功',
   *   data: []
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */
  async getAwardsList (req, res, next) {
    let awardList = await AwardModel.find({}, {'_id': 0, '__v': 0})
    if (awardList) {
      res.json({
        status: 200,
        message: '查询成功',
        data: awardList
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
   * @api {get} /award/updateAwardInfo  根据索引更新某个奖项信息
   * @apiName 根据索引更新某个奖项信息
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 根据索引更新某个奖项信息
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '更新成功',
   *   data: []
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '更新失败',
   *  }
   */  
  async updateAwardInfo (req, res, next) {
    const {awardIndex, isOpen, isLotteryOver, isOpenResultOver, owner, redeemNum} = req.body
    try {
      if (!awardIndex && awardIndex !== 0) {
        throw new Error('轮次不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    // 改变奖项的状态
    let info
    if (isOpen === true) {
      info = await AwardModel.findOneAndUpdate({awardIndex}, {$set: {isOpen}})
    }
    if (isOpen === false) {
      info = await AwardModel.findOneAndUpdate({awardIndex}, {$set: {isOpen}})
    }
    if (isLotteryOver === true) {
      info = await AwardModel.findOneAndUpdate({awardIndex}, {$set: {isLotteryOver}})
    }
    if (isOpenResultOver === true) {
      info = await AwardModel.findOneAndUpdate({awardIndex}, {$set: {
        isOpenResultOver,
        owner,
        redeemNum,
        overTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss")
      }})
    }
    if (info) {
      res.json({
        status: 200,
        message: '更新数据成功'
      })
      return
    } else {
      next({
        status: 200,
        message: '更新数据失败'
      })
    }
    
  }

  /**
   *
   * @api {get} /award/joinAward  参与抽奖
   * @apiName 参与抽奖
   * @apiGroup user
   * @apiVersion 1.0.0
   * @apiDescription 参与抽奖
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '参与成功',
   *   data: []
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '参与失败',
   *  }
   */  
  async joinAward (req, res, next) {
    let awardIndex = req.body.awardIndex
    let username = req.user.username
    try {
      if (!awardIndex && awardIndex !== 0) {
        throw new Error('轮次不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    // 判断是否已经加入
    let isJoinInfo = await AwardModel.findOne({"lotteryJoinList.username": username, awardIndex})
    if (isJoinInfo) {
      res.json({
        status: 200,
        message: '记录已存在'
      })
    } else {
      let awardInfo = await AwardModel.findOne({awardIndex})
      if (awardInfo) {
        let lotteryJoinList = awardInfo.lotteryJoinList
        lotteryJoinList.push({
          username,
          createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss")
        })
        let info = await AwardModel.findOneAndUpdate({awardIndex}, {$set: {lotteryJoinList}})
        if (info) {
          res.json({
            status: 200,
            message: '更新数据成功'
          })
        } else {
          next({
            status: 0,
            message: '更新数据失败'
          })
        }
      }
    }
  }

  /**
   *
   * @api {get} /award/awardsAdd  添加奖项
   * @apiName 添加奖项
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 添加奖项
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '添加成功'
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '添加失败',
   *  }
   */
  async addAward (req, res, next) {
    const {awardName, amount, des} = req.body
    try {
      if (!awardName) {
        throw new Error('奖项名称不能为空')
      } else if (!amount) {
        throw new Error('数量必须大于0')
      } else if (!des) {
        throw new Error('数量必须大于0')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    try {
      let awardInfo = await AwardModel.findOne({
        awardName
      })
      if (awardInfo) {
        res.json({
          status: 0,
          message: '奖项已存在'
        })
        return
      }
      // 获取图片链接
      // let imgPath = await this.getImgPath(files)
      // imgPath = '/public/img/' + imgPath
      //保存
      let awardList = await AwardModel.find({})
      let length = awardList.length
      let addAwardList = []
      for (let i = 0; i < amount; i++) {
        let obj = {
          awardName,
          awardIndex: length + i,
          des,
          isOpen: false,
          isLotteryOver: false,
          isOpenResultOver: false,
          createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss")
        }
        addAwardList.push(obj)
      }
      AwardModel.create(addAwardList, (err) => {
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
    } catch (err) {
      next({
        status: 0,
        message: '表单信息错误'
      })
    }
  }

  /**
   *
   * @api {get} /award/getAwardItem  根据索引获取某个奖项详情
   * @apiName 根据索引获取某个奖项详情
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 根据索引获取某个奖项详情
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功',
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
  async getAwardItem (req, res, next) {
    let awardIndex = req.query.awardIndex
    try {
      if (!awardIndex && awardIndex !== 0) {
        throw new Error('奖项不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let awardInfo = await AwardModel.findOne({awardIndex})
    if (awardInfo) {
      res.json({
        status: 200,
        message: '查询数据成功',
        data: awardInfo
      })
    } else {
      next({
        status: 0,
        message: '查询数据失败'
      })
    }
  }

  /**
   *
   * @api {get} /award/getLucyNum  获取幸运号码
   * @apiName 获取幸运号码
   * @apiGroup admin
   * @apiVersion 1.0.0
   * @apiDescription 获取幸运号码
   *
   * @apiSuccess {String} status 结果码
   * @apiSuccess {String} message 消息说明
   * 
   * @apiSuccessExample {json}Success-Response:
   *  HTTP/1.1 200 OK
   * {
   *   status: 200,
   *   message: '查询成功',
   *   data: 123
   * }
   *
   *  @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 200
   *  {
   *   status: 0,
   *   message: '查询失败',
   *  }
   */
  async getLucyNum (req, res, next) {
    let awardIndex = req.query.awardIndex
    let lang = req.query.lang
    let username = req.user.username
    try {
      if (!awardIndex) {
        throw new Error('奖项不能为空')
      } else if (!lang) {
        throw new Error('语言不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let awardInfo = await AwardModel.findOne({awardIndex})
    if (awardInfo) {
      // 先判断抽奖是否结束
      if (awardInfo.isLotteryOver === true) {
        res.json({
          status: 0,
          message: '抽奖已经结束了'
        })
        return
      }
      let luckyNumList = awardInfo.luckyNumList
      let luckyLength = luckyNumList.length
      let obj = {
        username,
        lang,
        luckyNum: luckyLength + 1,
        createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss")
      }
      luckyNumList.push(obj)
      let info = await AwardModel.findOneAndUpdate({awardIndex}, {$set: {luckyNumList}})
      if (info) {
        res.json({
          status: 200,
          message: '更新数据成功',
          data: luckyLength + 1
        })
      } else {
        next({
          status: 200,
          message: '更新数据失败'
        })
      }
    } else {
      next({
        status: 0,
        message: '查询数据失败'
      })
    }
  }

}

export default new Award()