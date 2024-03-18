import  Express  from "express";
import { createhotel, deletehotel, gethotel, gethotelsSearch, updatehotel } from "../controllers/package.controller.js";
import { veryfyTocken } from "../utils/verifyUser.js";

const router = Express.Router();

router.post('/createhotel', veryfyTocken, createhotel);
router.delete('/delete/:id', veryfyTocken, deletehotel);
router.post('/update/:id', veryfyTocken, updatehotel);
router.get('/get-update/:id', gethotel);
router.get('/gethotels', gethotelsSearch);


export default router;