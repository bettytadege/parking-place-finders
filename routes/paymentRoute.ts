import express from 'express'
import { checkout} from '../controller/paymentController'
const router=express.Router()



router.post('/checkout',checkout)

export default router