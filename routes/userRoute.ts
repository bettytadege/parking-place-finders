import express from 'express'
import { getAllUser, getUserProfile, login, register} from '../controller/userController'
const router=express.Router()

router.route('/').get(getAllUser)
router.route('/:id').get(getUserProfile)
router.post('/register',register)
router.post('/login',login)

export default router