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
    this.getAwardItemStatus = this.getAwardItemStatus.bind(this)
    this.getLucyNum = this.getLucyNum.bind(this)
  }

  /**
   *
   * @api {get} /award/remainTime  获取奖项列表
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
  async addAward (req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      if (err) {
        next({
          status: 0,
          message: '表单信息错误'
        })
        return
      }
      // 必须传图片不然报错
      const {awardName, amount, giftName} = JSON.parse(fields.awardObj)
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
        let imgPath = await this.getImgPath(files)
        imgPath = '/public/img/' + imgPath
        //保存
        let awardList = await AwardModel.find({})
        let length = awardList.length
        let addAwardList = []
        for (let i = 0; i < amount; i++) {
          let obj = {
            level: (length + 1) + '-' + (i + 1),
            des: '第' + (i + 1) + '轮',
            isOver: false,
          }
          addAwardList.push(obj)
        }
        let newAward = {
          awardList: addAwardList,
          awardName,
          giftName,
          imgPath,
          isOpen: false,
          createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
        }
        AwardModel.create(newAward, (err) => {
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
    })
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
  async getAwardItemStatus (req, res, next) {
    let type = req.query.type
    let level = req.query.level
    console.log(type)
    console.log(level)
    try {
      if (!type) {
        throw new Error('类型不能为空')
      } else if (!level) {
        throw new Error('轮次不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let awardInfo = await AwardModel.find({'awardList.level': {$eq: level}}, {'awardList.$': 1})
    if (awardInfo && awardInfo.length > 0) {
      let status
      if (type === 'lottery') {
        status = awardInfo[0].awardList[0].isLotteryOver
      }
      if (type === 'openResult') {
        status = awardInfo[0].awardList[0].isOpenResultOver
      }
      res.json({
        status: 200,
        message: '查询数据成功',
        data: status
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
    let level = req.query.level
    let username = req.user.username
    try {
      if (!level) {
        throw new Error('轮次不能为空')
      }
    } catch (err) {
      next({
        status: 0,
        message: err.message
      })
      return
    }
    let awardInfo = await AwardModel.find({'awardList.level': {$eq: level}}, {'awardList.$': 1})
    if (awardInfo && awardInfo.length > 0) {
      let luckyNumList = awardInfo[0].awardList[0].luckyNumList
      let luckyLength = luckyNumList.length
      let obj = {
        username,
        luckyNum: luckyLength + 1,
        createTime: dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss")
      }
      luckyNumList.push(obj)
      let info = await AwardModel.findOneAndUpdate({'awardList.level': {$eq: level}}, {$set: {'awardList.0.luckyNumList': luckyNumList}})
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