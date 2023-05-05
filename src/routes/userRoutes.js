import express from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user/userController.js'

const router = express.Router()

// Get all users
router.get('/', getUsers)

// Get user by ID
router.get('/:id', getUserById)

// Create a user
router.post('/', createUser)

// Update a user
router.put('/:id', updateUser)

// Delete a user
router.delete('/:id', deleteUser)

export default router
