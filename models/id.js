'use strict';

import mongoose from 'mongoose'

const idSchema = new mongoose.Schema({
	img_id: Number
})

const Id = mongoose.model('Id', idSchema)
Id.findOne((err, data) => {
	if (!data) {
		const newId = new Id({
			img_id: 0
		})
		newId.save()
	}
})
export default Id