import  Express  from "express";
import { createPkg } from "../controllers/pkgListning.controller.js";
import { veryfyTocken } from "../utils/verifyUser.js";

const router = Express.Router();

router.post('/createpkg', veryfyTocken, createPkg);

export default router;