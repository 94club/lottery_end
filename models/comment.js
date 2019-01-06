'use strict'

import mongoose from 'mongoose'
import CommentData from '../initData/commentStatus'
const Schema = mongoose.Schema

const commentSchema = new Schema({
  id: {type: Number},
	status: {type: Number} // 1可以评论 2 不可以评论 只有添加完毕才可以评论
})

const Comment = mongoose.model('Comment', commentSchema)
Comment.findOne((err, data) => {
  if (!data) {
    CommentData.forEach((ele) => {
      Comment.create(ele)
    })
  }
})
export default Comment