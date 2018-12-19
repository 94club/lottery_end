'user stirct'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const fashionSchema = new Schema({
  id: Number,
  imgSrc: String,
  gradeDetailList: [
    {
      username: String,
      score: Number
    }
  ]
})
const Fashion = mongoose.model('Fashion', fashionSchema)
export default Fashion