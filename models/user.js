'use strict'

import mongoose from 'mongoose'
import dateAndTime from 'date-and-time'
import userList from '../initData/user'

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	id: Number,
	createTime: String,
	lang: String, // 语言
	role: Number,  // 0 普通 1管理
	avatar: {type: String, default: '/public/img/avatar.jpg'}, // 头像
	hadPrize: {type: Boolean, default: false}, // 是否中奖
	hadFashionComment:  {type: Boolean, default: false} // 是否评论服装
})

const User = mongoose.model('User', userSchema)
User.findOne((err, data) => {
	if (!data) {
		userList.forEach((ele, index) => {
			ele.createTime = dateAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss")
			User.create(ele)
		})
	}
})
export default User