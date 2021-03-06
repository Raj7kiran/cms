import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'
import { getPackage, addPackage, deletePackage,updatePackage } from '../controllers/adminController.js'


router.route('/packages').get(protect, admin,getPackage).post(protect, admin, addPackage)
router.route('/packages/:id').delete(protect, admin, deletePackage).put(protect, admin, updatePackage)


export default router