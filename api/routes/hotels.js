import  Express  from "express";
import { createhotel, deletehotel, gethotel, gethotelsSearch, updatehotel } from "../controllers/hotel.js";
import { veryfyTocken } from "../utils/verifyUser.js";

const router = Express.Router();

router.post('/createhotel', createhotel);
router.delete('/delete/:id', veryfyTocken, deletehotel);
router.post('/update/:id', veryfyTocken, updatehotel);
router.get('/get-update/:id', gethotel);



export default router;