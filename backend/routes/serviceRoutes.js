import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { createService, getService, deleteServiceById, updateServiceById, getServiceById } from '../controllers/serviceController.js'


router.route('/').get(protect, getService).post(protect, createService)
router.route('/:id').put(protect, updateServiceById).delete(protect, deleteServiceById).get(protect, getServiceById)


export default router