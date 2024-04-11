import Express from "express";
import {
  createPkg,
  deletePkg,
  getPkg,
  getPkgsSearch,
  updatePkg,
} from "../controllers/package.controller.js";
import { veryfyTocken } from "../utils/verifyUser.js";

const router = Express.Router();

router.post("/createpkg", veryfyTocken, createPkg);
router.delete("/delete/:id", veryfyTocken, deletePkg);
router.post("/update/:id", veryfyTocken, updatePkg);
router.get("/get-update/:id", getPkg);
router.get("/getpkgs", getPkgsSearch);

export default router;
