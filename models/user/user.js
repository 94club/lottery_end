'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	userName: String,
	id: Number,
	createTime: String,
	lang: String, // 语言
	role: Number,  // 1嘉宾 2管理员
	avatar: {type: String, default: '/public/img/avatar.jpg'}, // 头像
	company: String,
	hadPrize: Boolean,
	level: String
})

const User = mongoose.model('User', userSchema)

export default User