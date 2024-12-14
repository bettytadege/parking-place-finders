import express from 'express'
import { deleteVehicle, register, updateVehicle} from '../controller/vehicleController'
const router=express.Router()


router.route('/:id').delete(deleteVehicle).patch(updateVehicle)
router.post('/register',register)

export default router