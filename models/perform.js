'user stirct'
import mongoose from 'mongoose'
import performList from '../initData/perform'

const Schema = mongoose.Schema

const performSchema = new Schema({
  id: Number,
  department: String,
  joinPeople: String,
  performName: String,
  gradeDetailList: [
    {
      username: String,
      score: Number
    }
  ]
})
const Perform = mongoose.model('Perform', performSchema)
Perform.findOne((err, data) => {
  if (!data) {
    performList.forEach((ele) => {
      Perform.create(ele)
    })
  }
})
export default Perform