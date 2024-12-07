
import express from 'express'
import {getAllBookingsForProvider, reserve } from '../controller/bookingController'
const router=express.Router()


router.route('/:providerId').get(getAllBookingsForProvider)
router.post('/reserve',reserve)


export default router