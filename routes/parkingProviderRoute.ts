import express from 'express'
import { getAllProvider, getProviderProfile, register, updateProvider} from '../controller/parkingProviderController'
const router=express.Router()

router.route('/').get(getAllProvider)
router.route('/:id').get(getProviderProfile).patch(updateProvider)
router.post('/register',register)


export default router