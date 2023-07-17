import { Router } from 'express'
import {getUser, getAllUsers, updateUser, deleteUser, adminStatus} from '../controllers/user.js'
import {isAuthorized, isAdmin} from '../middlewares/jwt.js'

const router= Router()

router.get('/all', isAdmin, getAllUsers)
router.get('/:id', isAuthorized, getUser)
router.put('/:id', isAuthorized, updateUser)
router.put('/admin-status/:id', isAdmin, adminStatus)
router.delete('/:id', isAuthorized, deleteUser)

export default router