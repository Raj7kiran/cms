import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { createSale, getSale, deleteSaleById, updateSaleById, getSaleById } from '../controllers/saleController.js'


router.route('/').get(protect, getSale).post(protect, createSale)
router.route('/:id').put(protect, updateSaleById).delete(protect, deleteSaleById).get(protect, getSaleById)


export default router