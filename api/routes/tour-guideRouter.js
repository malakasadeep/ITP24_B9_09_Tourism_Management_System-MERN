import express from "express";
import {
  createGuide,
  Deleteguide,
  updateGuide,
  getGuide,
  getGuidSearch,
} from "../controllers/createGuide.controller.js";
import { veryfyTocken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", createGuide);
router.delete("/delete/:id", Deleteguide);
router.post("/update/:id", updateGuide);
router.get("/get/:id", getGuide);
router.get("/search-guid", getGuidSearch);

export default router;
