'user stirct'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import FashionList from '../initData/fashion'
const fashionSchema = new Schema({
  id: Number,
  imgSrc: String,
  gradeDetailList: [
    {
      username: String
    }
  ]
})
const Fashion = mongoose.model('Fashion', fashionSchema)
Fashion.findOne((err, data) => {
  if (!data) {
    FashionList.forEach((ele) => {
      Fashion.create(ele)
    })
  }
})
export default Fashion