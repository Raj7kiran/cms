import mongoose from 'mongoose'


const serviceSchema = mongoose.Schema (
	{
		name: {
			type: String
		}, 
		baseCost: {
			type: Number
		},
		minCost: {
			type: Number
		},
		serviceCost: {
			type: Number
		},
		createdBy : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		createdDate: {
			type: Date
		},
		updatedDate: {
			type: Date
		},
		isDeleted :{
			type: Boolean,
			default: false
		},
		isActive :{
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}

	)


const Service = mongoose.model('Service', serviceSchema)

export default Service