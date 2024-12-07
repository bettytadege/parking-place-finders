import express from 'express'
import { getAllProvider, getOneProvider, register, updateProvider} from '../controller/parkingProviderController'
const router=express.Router()

router.route('/').get(getAllProvider)
router.route('/:id').get(getOneProvider).patch(updateProvider)
router.post('/register',register)


export default router