'user stirct'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const awardSchema = new Schema({
  awardName: String, // 奖项名字
  awardIndex: String, // 奖项的索引，从0开始
  des: String, // 奖项的描述
  isOpen: Boolean, // 奖项是否开启
  isLotteryOver: Boolean, // 抽奖结束，表示不能抽奖
  isOpenResultOver: Boolean, // 开奖结束，表示进行下一次抽奖
  createTime: String, // 奖项创建时间
  overTime: String, // 开奖结束时间
  owner: String,
  redeemNum: Number,
  lotteryJoinList: {type: Array, default: []},
  luckyNumList: [
    {
      luckyNum: Number, // 从1开始
      lang: String,
      username: String,
      createTime: String,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
  ]
})
const Award = mongoose.model('Award', awardSchema)
export default Award