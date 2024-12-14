
import express from 'express'
import {create} from '../controller/rateController'
const router=express.Router()



router.post('/',create)


export default router