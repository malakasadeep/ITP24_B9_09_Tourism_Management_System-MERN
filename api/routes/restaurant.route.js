import express from 'express'
import { createRestaurant, getRestaurant, updateRestaurant, deleteRestaurant } from "../controllers/restaurant.controller.js"
const router = express.Router()

router.post('/', createRestaurant)
router.get('/', getRestaurant)
router.put('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)

export default router;