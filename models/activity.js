'user stirct'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const activitySchema = new Schema({
  id: Number,
  gradeDetailList: Array
})
const Activity = mongoose.model('Activity', activitySchema)
export default Activity