import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
import User from '../models/userModel.js'
import Package from '../models/packageModel.js'


//login 
const authUser = asyncHandler(async(req,res) => {
	const { email, password } = req.body
	
		const user = await User.findOne({email})
				
		if(user && (await user.matchPassword(password))){
			// if(user && !user.isAdmin){
			// const comp = await Company.findOne({name : user.company})
			// const diffInMs = await Math.abs(comp.createdAt - Date.now());
		 //  	const diff = await  Math.floor(diffInMs / (1000 * 60 * 60 * 24))

		 //  	const pack = await Package.findOne({packageName: user.package})
		  	
		 //  	if(diff > pack.maxDaysAllowed){
			// 	  		res.status(400)
			// 	  		throw new Error('Sorry you package has been expired! Please renew it to proceed.')
			// 	  	}	
			// }
			
			res.json({
				_id: user._id,
				name: user.name,
				firstName: user.firstName,
				lastName: user.lastName,				
				email: user.email,
				isAdmin: user.isAdmin,
				isClientAdmin: user.isClientAdmin,
				package: user.package,
				dob: user.dob,
				city: user.city,
				state: user.city,
				country: user.country,
				pincode: user.pincode,
				address: user.address,
				createdBy: user.createdBy,
				updatedBy: user.updatedBy,
				token: generateToken(user._id)
			})
			// res.json({user})
		} else{
			res.status(401)
			throw new Error('Invalid username or password')
		}

		res.send({email,password})

})


//add Client Admin
const addUser = asyncHandler(async(req,res) => {
	const { firstName, lastName, email, packageName, isAdmin, alternatePhone,
			isClientAdmin, phone, dob, pincode, city, state, country, gender, address, revenue, profit } = req.body
	console.log(req.body)

	// const companyExists = await Company.findOne({name: company})
	// console.log(companyExists)

	// if(companyExists){
		// console.log('company exists')
		// const currentUserCount = await User.find({company: company}).count()
		// const currentUserCount = await User.find({}).count()
		// console.log('currentUserCount' + currentUserCount)

		// const checkPack = await Package.find({packageName:packageName})
		// console.log('maxUserAllowed' + checkPack[0].maxUserAllowed)
		// console.log(checkPack)
		
		// if(checkPack){			
		// 	if(currentUserCount >= checkPack[0].maxUserAllowed)
		// 		{
		// 			res.status(200)
		// 			throw new Error('You have reached the maximum user limit')
		// 		}				
		// 	} 

	// } else {
	// 		console.log('creating a new company')
	// 		const newCompany = await Company.create({name: company, createdOn: Date.now(), package: packageName })
	// 		console.log('newCompany' + newCompany)
	// 	}
			
	console.log('checking if user exists')
	const userExists = await User.findOne({ email })

	if(userExists){
		res.status(400)
		throw new Error('User email already exists')
		// res.json(userExists)
	}

	const user = await User.create({
		name: `${firstName} ${lastName}`, firstName, lastName, email, password: '123456', package:packageName,
		isAdmin, isClientAdmin, createdBy: req.user._id, city, state, country, dob, pincode, gender, phone, alternatePhone, address
	})
	// console.log(user)	

	if(user){
		// console.log('updating num users')
		// const comp = await Company.findOne({name: company})
		// comp.numUsers = comp.numUsers +1 
		// const updatedComp = await comp.save()
		// console.log( 'updatedComp' + updatedComp)	

		res.status(201).json({
			_id: user._id,
			name: user.name,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			isAdmin: user.isAdmin,
			isClientAdmin: user.isClientAdmin,
			package: user.package,
			dob: user.dob,
			city: user.city,
			state: user.state,
			country: user.country,
			pincode: user.pincode,
			gender: user.gender,
			createdBy: user.createdBy,
			phone: user.phone,
			alternatePhone: user.alternatePhone,
			address: user.address
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}

})


//get Users
const getUsers = asyncHandler(async(req,res) => {
	const users = await User.find({createdBy: req.user._id}).sort({createdAt: -1})

	if(users){
		res.json(users)
	} else {
		res.status(500)
		throw new Error('Something went wrong, please try again')
	}
	
})


//get userprofile
const getUserProfile = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user._id);

	if(user){
		res.json({ 	
				_id: user._id,
				name: user.name,
				firstName: user.firstName,
				lastName: user.lastName,				
				email: user.email,
				isAdmin: user.isAdmin,
				isClientAdmin: user.isClientAdmin,
				package: user.package,
				gender: user.gender,
				phone: user.phone,
				alternatePhone: user.alternatePhone,
				dob: user.dob,
				city: user.city,
				state: user.city,
				country: user.country,
				pincode: user.pincode,
				address: user.address,
				createdBy: user.createdBy,
				updatedBy: user.updatedBy,
				revenue: user.revenue,
				profit: user.profit,
				token: generateToken(user._id)
			})
	} else{
		res.status(404)
		throw new Error ('User not found')
	}
})


//get user by id
const getUserById = asyncHandler(async (req,res) => {
	const user = await User.findById(req.params.id).select('-password')

	if(user){
		res.json(user);
	} else {
		res.status(404)
		throw new Error('User not found')
	}	

})


//delete user
const deleteUser = asyncHandler(async (req,res) => {
	const user = await User.findById(req.params.id);
	
	if(user){
		await user.remove()
		res.json({ message: 'User Removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}	

})


//.@desc update user
//.@route PUT /api/users/:id
//.@access Private/Admin
const updateUser = asyncHandler(async (req,res) => {
	const user = await User.findById(req.params.id);
	
	if(user){
		user.name = `${req.body.firstName} ${req.body.lastName}` || user.firstName
		user.firstName = req.body.firstName || user.firstName
		user.lastName = req.body.lastName || user.lastName
		user.email =  req.body.email || user.email
		user.company = user.company
		user.city = req.body.city || user.city
		user.state = req.body.state || user.state
		user.country = req.body.country || user.country
		user.phone = req.body.phone || user.phone
		user.alternatePhone = req.body.alternatePhone || user.alternatePhone
		user.package = req.body.package || user.package
		user.gender = req.body.gender || user.gender
		user.dob = req.body.dob || user.dob
		user.pincode = req.body.pincode || user.pincode
		user.address = req.body.address || user.address
		user.revenue = req.body.revenue || user.revenue
		user.profit = req.body.profit || user.profit
		// user.isAdmin =  req.body.isAdmin
		// user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
		user.isAdmin = req.body.isAdmin ?? user.isAdmin
		user.isClientAdmin = req.body.isClientAdmin ?? user.isClientAdmin
		
		if(req.body.password){
			user.password = req.body.password
		}
		
		const updatedUser = await user.save()

		res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,				
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				isClientAdmin: updatedUser.isClientAdmin,
				role: updatedUser.role,
				company: updatedUser.company,
				package: updatedUser.package,
				dob: updatedUser.dob,
				city: updatedUser.city,
				state: updatedUser.state,
				country: updatedUser.country,
				pincode: updatedUser.pincode,
				phone: updatedUser.phone,
				gender: updatedUser.gender,
				createdBy: updatedUser.createdBy,
				updatedBy: updatedUser.updatedBy,
				address: updatedUser.address
		})

	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})


//.@desc update user profile
//.@route PUT /api/users/profile
//.@access Private
const updateUserProfile = asyncHandler(async (req,res) => {
	const user = await User.findById(req.user._id);
	

	if(user){
		user.firstName = `${req.body.firstName} ${req.body.lastName}` || user.firstName
		user.lastName = req.body.lastName || user.lastName
		user.email =  req.body.email || user.email
		user.company = user.company
		user.city = req.body.city || user.city
		user.state = req.body.state || user.state
		user.country = req.body.country || user.country
		user.phone = req.body.phone || user.phone
		user.alternatePhone = req.body.alternatePhone || user.alternatePhone
		user.package = req.body.package || user.package
		user.gender = req.body.gender || user.gender
		user.dob = req.body.dob || user.dob
		user.pincode = req.body.pincode || user.pincode
		user.address = req.body.address || user.address
		user.revenue = req.body.revenue || user.revenue
		user.profit = req.body.profit || user.profit
		// user.isAdmin =  req.body.isAdmin
		// user.isAdmin = req.body.isAdmin === undefined ? user.isAdmin : req.body.isAdmin
		user.isAdmin = req.body.isAdmin ?? user.isAdmin
		user.isClientAdmin = req.body.isClientAdmin ?? user.isClientAdmin
		
		if(req.body.password){
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				firstName: updatedUser.firstName,
				lastName: updatedUser.lastName,				
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				isClientAdmin: updatedUser.isClientAdmin,
				role: updatedUser.role,
				company: updatedUser.company,
				package: updatedUser.package,
				dob: updatedUser.dob,
				city: updatedUser.city,
				state: updatedUser.state,
				country: updatedUser.country,
				pincode: updatedUser.pincode,
				phone: updatedUser.phone,
				gender: updatedUser.gender,
				createdBy: updatedUser.createdBy,
				updatedBy: updatedUser.updatedBy,
				address: updatedUser.address
		})

	} else{
		res.status(404)
		throw new Error ('User not found')
	}

})



export { authUser, addUser, getUsers, getUserProfile, getUserById, deleteUser, 
	updateUser, updateUserProfile }