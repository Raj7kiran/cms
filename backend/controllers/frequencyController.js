import asyncHandler from 'express-async-handler'
import Frequency from '../models/frequencyModel.js'



export const getFrequency = asyncHandler(async(req, res) => {
	const frequency = await Frequency.find({}).populate('createdBy', 'name').sort({createdAt: -1})
	res.json(frequency)
})


export const createFrequency = asyncHandler(async(req, res) => {
	const { name} = req.body

	const newFrequency = await Frequency.create({ name, createdBy: req.user._id, createdAt: Date.now() })

	if(newFrequency) {
		res.json(newFrequency)
	} else {
		res.status(400)
		throw new Error('Invaid Data')
	}

})


export const deleteFrequencyById = asyncHandler(async(req, res) => {
	const foundFrequency = await Frequency.findById(req.params.id)

	if(foundFrequency){
		await foundFrequency.remove()
		res.json({message: 'Frequency Removed'})
	} else {
		res.status(404)
		res.json({message: 'Frequency not found'})
	}
})


export const getFrequencyById = asyncHandler(async(req, res) => {
	const frequency = await Frequency.findById(req.params.id)

	if(frequency) {
		res.json(frequency)
	} else {
		res.status(404)
		res.json({message: 'Frequency not found'})
	}

})

export const updateFrequencyById = asyncHandler(async(req, res) => {
	const foundFrequency = await Frequency.findById(req.params.id)

	if(foundFrequency) {
		foundFrequency.name = req.body.name || foundFrequency.name
		foundFrequency.updatedBy = req.user._id
		foundFrequency.updatedAt = Date.now()
		foundFrequency.isActive = req.body.isActive || foundFrequency.isActive
		foundFrequency.isDeleted = req.body.isDeleted || foundFrequency.isDeleted

		const updatedFrequency = await foundFrequency.save()

		res.json({
			_id: updatedFrequency._id,
			name: updatedFrequency.name,
			createdBy: updatedFrequency.createdBy,
			updatedBy: updatedFrequency.updatedBy,
			createdAt: updatedFrequency.createdAt,
			updatedAt: updatedFrequency.updatedAt,
		})
	} else {
		res.status(404)
		res.json({message: 'Frequency not found'})
	}
})
