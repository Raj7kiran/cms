import mongoose from 'mongoose'

const saleSchema = mongoose.Schema (
	{	
		customerId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Customer'
		},
		serviceId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Service'
		},
		frequencyId : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Frequency'
		},
		quantity : {
			type: Number
		},
		proposedCost : {
			type: Number
		},
		agreedCost : {
			type: Number
		},
		planStartDate: {
			type: Date
		},
		planEndDate: {
			type: Date
		},
		actualStartDate: {
			type: Date
		},
		actualEndDate: {
			type: Date
		},
		status: {
			type: String
		},
		isRecurring :{
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)

const Sale = mongoose.model('Sale', saleSchema)

export default Sale
