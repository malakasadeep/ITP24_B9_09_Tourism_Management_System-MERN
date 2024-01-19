import  Express  from "express";
import { createPkg, deletePkg } from "../controllers/package.controller.js";
import { veryfyTocken } from "../utils/verifyUser.js";

const router = Express.Router();

router.post('/createpkg', veryfyTocken, createPkg);
router.delete('/delete/:id', veryfyTocken, deletePkg)

export default router;