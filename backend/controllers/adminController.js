import asyncHandler from 'express-async-handler'
import Package from '../models/packageModel.js'


//get package
const getPackage = asyncHandler(async(req,res) => {

	const packages = await Package.find({}).sort({createdAt: -1})
	console.log(req.user)
	res.json(packages)
})

//add package
const addPackage = asyncHandler(async(req, res) => {
	const { packageName, maxDaysAllowed, maxUserAllowed } = req.body

	const newPackage = await Package.create({ packageName, maxDaysAllowed, maxUserAllowed })

	if(newPackage){
		res.json(newPackage)
	} else {
		res.status(400)
		throw new Error('Invalid data')
	}

})

const deletePackage = asyncHandler(async (req,res) => {
	const foundpackage = await Package.findById(req.params.id);
	
	if(foundpackage){
		await foundpackage.remove()
		res.json({ message: 'Package Removed' })
	} else {
		res.status(404)
		throw new Error('Package not found')
	}	

})


const updatePackage = asyncHandler(async (req,res) => {
	const foundPackage = await Package.findById(req.params.id);
	
	if(foundPackage){
		foundPackage.packageName = req.body.packageName || foundPackage.packageName
		foundPackage.maxDaysAllowed = req.body.maxDaysAllowed || foundPackage.maxDaysAllowed
		foundPackage.maxUserAllowed =  req.body.maxUserAllowed || foundPackage.maxUserAllowed
			
		const updatedPackage = await foundPackage.save()

		res.json({updatedPackage})

	} else{
		res.status(404)
		throw new Error ('Package not found')
	}

})


export { getPackage, addPackage,deletePackage, updatePackage }
