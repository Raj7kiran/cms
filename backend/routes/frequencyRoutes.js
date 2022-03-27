import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { createFrequency, getFrequency, deleteFrequencyById, updateFrequencyById, getFrequencyById } from '../controllers/frequencyController.js'


router.route('/').get(protect, getFrequency).post(protect, createFrequency)
router.route('/:id').put(protect, updateFrequencyById).delete(protect, deleteFrequencyById).get(protect, getFrequencyById)


export default router