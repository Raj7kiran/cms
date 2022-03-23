import express from 'express'
const router = express.Router()
import { getCountry, getState, getCity} from '../controllers/dpController.js'


router.get('/countries', getCountry)
// router.get('/states', getAllStates)
router.get('/states/:country', getState)
// router.get('/cities', getAllCities)
router.get('/cities/:state', getCity)

export default router