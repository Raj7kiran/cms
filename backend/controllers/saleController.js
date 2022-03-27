import asyncHandler from 'express-async-handler'
import Sale from '../models/saleModel.js'



export const getSale = asyncHandler(async(req, res) => {
	const sale = await Sale.find({}).sort({createdAt: -1})
	res.json(sale)
})


export const createSale = asyncHandler(async(req, res) => {
	const { name, serviceId, customerId, frequencyId, quantity, proposedCost, agreedCost, 
		planStartDate, planEndDate, actualStartDate, actualEndDate, status, isRecurring } = req.body

	const newSale = await Sale.create({  name, serviceId, customerId, frequencyId, quantity, proposedCost, agreedCost, 
		planStartDate, planEndDate, actualStartDate, actualEndDate, status, isRecurring })

	if(newSale) {
		res.json(newSale)
	} else {
		res.status(400)
		throw new Error('Invaid Data')
	}

})


export const deleteSaleById = asyncHandler(async(req, res) => {
	const foundSale = await Sale.findById(req.params.id)

	if(foundSale){
		await foundSale.remove()
		res.json({message: 'Sale Removed'})
	} else {
		res.status(404)
		res.json({message: 'Sale not found'})
	}
})


export const getSaleById = asyncHandler(async(req, res) => {
	const sale = await Sale.findById(req.params.id)

	if(sale) {
		res.json(sale)
	} else {
		res.status(404)
		res.json({message: 'Sale not found'})
	}

})

export const updateSaleById = asyncHandler(async(req, res) => {
	const foundSale = await Sale.findById(req.params.id)

	if(foundSale) {
		foundSale.serviceId = req.body.serviceId || foundSale.serviceId
		foundSale.customerId = req.body.customerId || foundSale.customerId
		foundSale.frequencyId = req.body.frequencyId || foundSale.frequencyId
		foundSale.quantity = req.body.quantity || foundSale.quantity
		foundSale.proposedCost = req.body.proposedCost || foundSale.proposedCost
		foundSale.actualCost = req.body.actualCost || foundSale.actualCost
		foundSale.planStartDate = req.body.planStartDate || foundSale.planStartDate
		foundSale.planEndDate = req.body.planEndDate || foundSale.planEndDate
		foundSale.actualStartDate = req.body.actualStartDate || foundSale.actualStartDate
		foundSale.actualEndDate = req.body.actualEndDate || foundSale.actualEndDate
		foundSale.status = req.body.status || foundSale.status
		foundSale.isRecurring = req.body.isRecurring || foundSale.isRecurring
		

		const updatedSale = await foundSale.save()

		res.json({
			_id: updatedSale._id,
			serviceId: updatedSale.serviceId,
			customerId: updatedSale.customerId,
			frequencyId: updatedSale.frequencyId,
			quantity: updatedSale.quantity,
			proposedCost: updatedSale.proposedCost,
			actualCost: updatedSale.actualCost,
			planStartDate: updatedSale.planStartDate,
			planEndDate: updatedSale.planEndDate,
			status: updatedSale.status,
			actualStartDate: updatedSale.actualStartDate,
			actualEndDate: updatedSale.actualEndDate,
		})
	} else {
		res.status(404)
		res.json({message: 'Sale not found'})
	}
})
