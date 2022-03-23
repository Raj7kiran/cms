import asyncHandler from 'express-async-handler'
import Country from '../models/countryModel.js'
import State from '../models/stateModel.js'
import City from '../models/cityModel.js'


const getCountry = asyncHandler( async(req,res) => {
	const countries = await Country.find({})

	if(countries){
		res.json(countries)
	} else {
		res.status(500)
		console.log('dint fetch the countries')
	}
})

const getState = asyncHandler(async(req,res) => {

	if(req.params.country === 'all'){
		const states = await State.find({})
		if(states){
			res.json(states)
		} else {
			res.status(500)
			console.log('dint fetch the states')
		}

	} else {
		const states = await State.find({ country : req.params.country })
		
		if(states){
			res.json(states)
		} else {
			res.status(500)
			console.log('dint fetch the states')
		}
	}
})

const getCity = asyncHandler(async(req,res) => {
	console.log(`re.params:  ${req.params.state}`)
	if(req.params.country === 'all'){
		const cities = await City.find({})
		if(cities){
			res.json(cities)
		} else {
			res.status(500)
			console.log('dint fetch the cities')
		}

	} else {
		const cities = await City.find({ state : req.params.state })
		if(cities){
			res.json(cities)
		} else {
			res.status(500)
			console.log('dint fetch the cities')
		}
	}
	
})


export { getCountry, getState, getCity }