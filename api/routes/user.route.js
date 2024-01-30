import express from 'express';
import { deleteUser, getUser, getUserPackages, test, updateUser } from '../controllers/user.controllers.js';
import { veryfyTocken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', veryfyTocken, updateUser);
router.delete('/delete/:id', veryfyTocken, deleteUser);
router.get('/packages/:id', veryfyTocken, getUserPackages);
router.get('/:id', veryfyTocken, getUser);

export default router;