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
  
}

export default new Award()