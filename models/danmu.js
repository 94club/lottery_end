'user stirct'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const danmuSchema = new Schema({
  username: String,
  msg: String,
  status: {type: Number, default: 0}, // 0 未读 1 已读
  createTime: String,
  id: Number
})
const Danmu = mongoose.model('Danmu', danmuSchema)

export default Danmu