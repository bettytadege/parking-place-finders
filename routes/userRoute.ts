import express from 'express'
import { getAllUser, getUserProfile, signIn} from '../controller/userController'
const router=express.Router()

router.route('/').get(getAllUser)
router.route('/:id').get(getUserProfile)
// router.post('/register',register)
router.post('/signIn',signIn)

export default router