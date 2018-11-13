'user stirct'
 import mongoose from 'mongoose'
 const Schema = mongoose.Schema
 const awardSchema = new Schema({
  awardName: String,
  giftName: String,
  imgPath: String,
  createTime: String,
  isOpen: {type: Boolean, default: false}, // 奖项是否开启
  awardList: [
    {
      level: String,
      des: String,
      updateTime: String,
      isLotteryOver: {type: Boolean, default: false}, // 抽奖结束，表示不能抽奖
      isOpenResultOver: {type: Boolean, default: false}, // 开奖结束，表示进行下一次抽奖
      luckyNumList: [
        {
          luckyNum: Number,
          username: String,
          createTime: String,
        }
      ],
      owner: String,
      redeemNum: Number
    }
  ]
 })
 const Award = mongoose.model('Award', awardSchema)
 export default Award