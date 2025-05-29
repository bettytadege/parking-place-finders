import express from 'express'
import { getAllProvider, getProviderProfile, register, Search, updateProvider} from '../controller/parkingProviderController'
const router=express.Router()

router.route('/').get(getAllProvider).get(Search)
router.route('/:id').get(getProviderProfile).patch(updateProvider)
router.post('/register',register)


export default router