import express from "express";

import {
  createLead,
  getLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { validateLead } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateLead, createLead);
router.get("/", getLeads);
router.get("/:id", getLead);
router.put("/:id", validateLead, updateLead);
router.delete("/:id", deleteLead);

export default router;
