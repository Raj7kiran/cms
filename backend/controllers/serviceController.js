import asyncHandler from 'express-async-handler'
import Service from '../models/serviceModel.js'



export const getService = asyncHandler(async(req, res) => {
	const services = await Service.find({}).sort({createdAt: -1})
	res.json(services)
})


export const createService = asyncHandler(async(req, res) => {
	const { name, baseCost, minCost, serviceCost } = req.body

	const newService = await Service.create({ name, baseCost, minCost, serviceCost, createdBy: req.user._id, createdAt: Date.now() })


	if(newService) {
		res.json(newService)
	} else {
		res.status(400)
		throw new Error('Invaid Data')
	}
})


export const deleteServiceById = asyncHandler(async(req, res) => {
	const foundService = await Service.findById(req.params.id)

	if(foundService){
		await foundService.remove()
		res.json({message: 'Service Removed'})
	} else {
		res.status(404)
		res.json({message: 'Service not found'})
	}
})


export const getServiceById = asyncHandler(async(req, res) => {
	const service = await Service.findById(req.params.id)

	if(service) {
		res.json(service)
	} else {
		res.status(404)
		res.json({message: 'Service not found'})
	}

})

export const updateServiceById = asyncHandler(async(req, res) => {
	const foundService = await Service.findById(req.params.id)

	if(foundService) {
		foundService.name = req.body.name || foundService.name
		foundService.baseCost = req.body.baseCost || foundService.baseCost
		foundService.minCost = req.body.minCost || foundService.minCost
		foundService.serviceCost = req.body.serviceCost || foundService.serviceCost
		foundService.updatedBy = req.user._id
		foundService.updatedAt = Date.now()
		foundService.isActive = req.body.isActive || foundService.isActive
		foundService.isDeleted = req.body.isDeleted || foundService.isDeleted

		const updatedService = await foundService.save()

		res.json({
			_id: updatedService._id,
			name: updatedService.name,
			baseCost: updatedService.baseCost,
			minCost: updatedService.minCost,
			serviceCost: updatedService.serviceCost,
			createdBy: updatedService.createdBy,
			updatedBy: updatedService.updatedBy,
			createdAt: updatedService.createdAt,
			updatedAt: updatedService.updatedAt,
		})
	} else {
		res.status(404)
		res.json({message: 'Service not found'})
	}
})
