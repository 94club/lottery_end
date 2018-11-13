'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	id: Number,
	createTime: String,
	lang: String, // 语言
	role: Number,  // 0 普通 1管理
	avatar: {type: String, default: '/public/img/avatar.jpg'}, // 头像
	hadPrize: {type: Boolean, default: false},
	grade: Number
})

const User = mongoose.model('User', userSchema)

export default User