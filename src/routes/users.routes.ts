import {Router} from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controllers'
import passport from 'passport'

const router = Router()


router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', passport.authenticate('jwt', {session: false}), createUser)
router.put('/users/:id', passport.authenticate('jwt', {session: false}), updateUser)
router.delete('/users/:id', passport.authenticate('jwt', {session: false}), deleteUser)

export default router