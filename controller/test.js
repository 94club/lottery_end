'user strict'

import UserModel from '../../models/user/user'
import AwardModel from '../../models/user/award'
import dtime from 'time-formater'

class User {
  constructor() {
    this.login = this.login.bind(this)
    this.getAwardsList = this.getAwardsList.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getResultByUser = this.getResultByUser.bind(this)
    this.saveRedeemNum = this.saveRedeemNum.bind(this)
    this.getLuckyNum = this.getLuckyNum.bind(this)
    this.addAwards = this.addAwards.bind(this)
    this.deleteAwards = this.deleteAwards.bind(this)
    this.updateLuckyNumSwitch = this.updateLuckyNumSwitch.bind(this)
    this.getAllUser = this.getAllUser.bind(this)
  }

  async login(req, res) {
    let role = 0
    let userName = req.body.userName
    let company = req.body.company
    let lang = req.body.lang
    try {
      if (!userName) {
        throw new Error('用户不能为空')
      } else if (!company) {
        throw new Error('公司不能为空')
      }
    } catch (err) {
      console.log(err.message, err)
      res.send({
        status: 0,
        message: err.message
      })
      return
    }
    if (userName === 'evebadmin') {
      role = 1
    }
    // 先查一遍看看是否存在
    let user = await UserModel.findOne({
      userName
    })
    if (user) {
      console.log('该用户已经存在')
      res.send({
        status: 0,
        message: '该用户已经存在'
      })
      return
    } else {
      let arr = await UserModel.find()
      let newUser = {
        userName,
        company,
        role,
        lang,
        hadPrize: false,
        createTime: dtime().format('YYYY-MM-DD HH:mm:ss'),
        id: arr.length + 1
      }
      await UserModel.create(newUser, (err, small) => {
        if (err) {
          res.json({
            status: 0,
            message: '注册失败'
          })
        } else {
          res.json({
            status: 200,
            message: '注册成功',
            data: newUser
          })
        }
      })
    }
  }
  async getAwardsList(req, res) {
    let awardList = await AwardModel.find({}, {
      '_id': 0,
      '__v': 0
    })
    if (awardList) {
      res.json({
        status: 200,
        message: '查询成功',
        data: awardList
      })
    } else {
      res.json({
        status: 0,
        message: '查询失败'
      })
    }
  }
  async getUserInfo(req, res) {
    // /user/:user_id
    // /file/* 正则表达式定义路由的时候，req.params[N] file/javascripts/jquery.js req.params[0] = "javascripts/jquery.js"
    let id = req.params.user_id
    console.log(id)
    let userInfo = await UserModel.findOne({
      id
    })
    if (userInfo) {
      res.json({
        status: 200,
        message: '查询成功',
        data: userInfo
      })
    } else {
      res.json({
        status: 0,
        message: '查询失败'
      })
    }
  }
  async getResultByUser(req, res) {
    let userName = req.query.userName
    try {
      if (!userName) {
        throw new Error('用户名不能为空')
      }
      let awardDetailList = await AwardModel.find({},{'_id': 0, '__v': 0})
      console.log(awardDetailList)
      let result = []
      awardDetailList.map((item) => {
        item.awardList.map((awardItem) => {
          let obj = {}
          obj.level = awardItem.level
          obj.redeemNum = awardItem.redeemNum
          awardItem.luckyNumList.map((luckyItem) => {
            if (luckyItem.userName === userName) {
              obj.luckyNum = luckyItem.luckyNum
            }
          })
          result.push(obj)
        })
      })
      console.log(result)
      res.json({
        status: 200,
        message: '查询数据成功',
        message: result
      })
    } catch (err) {
      console.log(err.message, err)
      res.json({
        status: 0,
        message: err.message
      })
      return
    }

  }
  async saveRedeemNum(req, res) {
    let redeemNum = parseInt(req.body.redeemNum)
    let level = req.body.level
    let awardName = req.body.awardName
    let owner = ''
    try {
      if (!redeemNum) {
        throw new Error('兑奖号码不能为空')
      } else if (!level) {
        throw new Error('奖项轮次不能为空')
      } else if (!awardName) {
        throw new Error('奖项名称不能为空')
      }
    } catch (err) {
      console.log(err.message, err)
      res.json({
        status: 0,
        message: err.message
      })
      return
    }
    try {
      let awardDetail = await AwardModel.findOne({
        awardName
      })
      if (awardDetail.awardList) {
        let awardList = awardDetail.awardList
        let awardListIndex = ''
        awardList.map((item, index) => {
          if (item.level === level) {
            item.redeemNum = redeemNum
            awardListIndex = index
          }
        })
        let awardInsideDetail = awardList[awardListIndex]
        let luckyNumList = awardInsideDetail.luckyNumList
        if (luckyNumList.length > 0) {
          luckyNumList.map((item) => {
            if (item.luckyNum === redeemNum) {
              awardInsideDetail.owner = item.userName
              awardInsideDetail.isOver = true
              owner = item.userName
            }
          })
        } else {
          res.json({
            status: 0,
            message: '抽奖人数为0'
          })
          return
        }
        AwardModel.findOneAndUpdate({
          awardName
        }, {
          $set: {
            awardList
          }
        }, (err) => {
          if (err) {
            res.json({
              status: 0,
              message: '获取兑奖号失败'
            })
          } else {
            UserModel.findOneAndUpdate({
              userName: owner
            }, {
              $set: {
                hadPrize: true,
                level
              }
            }, (err) => {
              if (err) {
                res.json({
                  status: 0,
                  message: '更新数据失败'
                })
              } else {
                res.json({
                  status: 200,
                  message: '获取兑奖号成功',
                  data: owner
                })
              }
            })
          }
        })
      } else {
        res.json({
          status: 0,
          message: '查询失败2'
        })
      }
    } catch (err) {
      res.json({
        status: 0,
        message: '查询失败1'
      })
    }
  }
  async getLuckyNum(req, res) {
    let userName = req.body.userName
    let level = req.body.level
    let awardName = req.body.awardName
    try {
      if (!level) {
        throw new Error('奖项轮次不能为空')
      } else if (!userName) {
        throw new Error('用户不能为空')
      }
    } catch (err) {
      console.log(err.message, err)
      res.json({
        status: 0,
        message: err.message
      })
      return
    }
    try {
      let awardDetail = await AwardModel.findOne({
        awardName
      })
      console.log('awardDetail' + awardDetail)
      if (awardDetail) {
        let awardList = awardDetail.awardList
        let awardListIndex = ''
        let luckyNumList = []
        awardList.map((item, index) => {
          if (item.level === level) {
            luckyNumList = item.luckyNumList
            awardListIndex = index
          }
        })
        let luckyNum = luckyNumList.length + 1
        luckyNumList.push({
          userName,
          luckyNum,
          createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
        })
        awardList[awardListIndex].luckyNumList = luckyNumList
        AwardModel.findOneAndUpdate({
          awardName
        }, {
          $set: {
            awardList
          }
        }, (err) => {
          if (err) {
            res.json({
              status: 0,
              message: '获取幸运号失败'
            })
          } else {
            res.json({
              status: 200,
              message: '获取幸运号成功',
              data: luckyNum
            })
          }
        })
      } else {
        res.json({
          status: 0,
          message: '查询失败'
        })
      }
    } catch (err) {
      res.json({
        status: 0,
        message: '查询失败1'
      })
    }

  }
  async deleteAwards(req, res) {
    let awardName = req.body.awardName
    try {
      if (!awardName) {
        throw new Error('奖项名称不能为空')
      }
    } catch (err) {
      console.log(err.message, err)
      res.json({
        status: 0,
        message: err.message
      })
      return
    }
    try {
      let obj = await AwardModel.deleteOne({
        awardName
      })
      if (obj.n > 0) {
        res.json({
          status: 200,
          message: '删除成功',
          data: ''
        })
      } else {
        res.json({
          status: 0,
          message: '删除失败'
        })
      }
    } catch (err) {
      res.json({
        status: 0,
        message: '查询失败1'
      })
    }

  }
  async addAwards(req, res) {
    let awardName = req.body.awardName
    let times = req.body.times
    let des = req.body.des
    try {
      if (!awardName) {
        throw new Error('奖项名称不能为空')
      } else if (!times || parseInt(times) < 0) {
        throw new Error('开奖次数要大于0')
      } else if (!des) {
        throw new Error('奖项描述不能为空')
      }
    } catch (err) {
      console.log(err.message, err)
      res.json({
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
      let awardList = []
      for (let i = 0; i < times; i++) {
        let obj1 = {
          level: awardName + '-' + (i + 1),
          owner: '',
          isOver: false,
          redeemNum: '',
          luckyNumList: []
        }
        awardList.push(obj1)
      }
      console.log(awardList)
      let newAward = {
        awardList,
        awardName,
        des,
        isOpen: false,
        createTime: dtime().format('YYYY-MM-DD HH:mm:ss'),
      }
      AwardModel.create(newAward, (err) => {
        if (err) {
          res.json({
            status: 0,
            message: '保存失败',
          })
        } else {
          res.json({
            status: 200,
            message: '保存成功',
            data: ''
          })
        }
      })
    } catch (err) {
      res.json({
        status: 0,
        message: '查询失败1'
      })
    }

  }
  async updateLuckyNumSwitch(req, res) {
    let awardName = req.body.awardName
    let isOpen = req.body.isOpen
    AwardModel.findOneAndUpdate({
      awardName
    }, {
      $set: {
        isOpen
      }
    }, (err) => {
      if (err) {
        res.json({
          status: 0,
          message: '操作失败'
        })
      } else {
        res.json({
          status: 200,
          message: '操作成功',
          data: ''
        })
      }
    })
  }
  async getAllUser(req, res) {
    try {
      let userList = await UserModel.find({}, {
        '_id': 0,
        '__v': 0
      })
      if (userList) {
        res.json({
          status: 200,
          message: '查询成功',
          data: userList
        })
      } else {
        res.json({
          status: 0,
          message: '查询失败'
        })
      }
    } catch (err) {
      res.json({
        status: 0,
        message: '查询失败1'
      })
    }

  }
}

export default new User()