import mongoose from 'mongoose'

const frequencySchema = mongoose.Schema (
	{	
		name: {
			type: String
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

const Frequency = mongoose.model('Frequency', frequencySchema)

export default Frequency
