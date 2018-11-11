'user stirct'
 import mongoose from 'mongoose'
 const Schema = mongoose.Schema
 const awardSchema = new Schema({
  awardName: String,
  des: String,
  isOpen: Boolean,
  createTime: String,
  awardList: [
    {
      level: String,
      createTime: String,
      isOver: Boolean,
      luckyNumList: [
        {
          luckyNum: Number,
          userName: String,
          createTime: String,
        }
      ],
      owner: String,
      redeemNum: Number
    }
  ],
 })
 const Award = mongoose.model('Award', awardSchema)
 export default Award