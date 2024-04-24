import express from 'express'
import { createPackage, getPackage, updatePackage, deletePackage } from '../controllers/res.package.controller.js'
const router = express.Router()

router.post('/', createPackage)
router.get('/', getPackage)
router.put('/:id', updatePackage)
router.delete('/:id', deletePackage)

export default router;