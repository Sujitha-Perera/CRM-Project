import express from "express";
import {
  addNote,
  deleteNote,
  getNotes,
} from "../controllers/noteController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateNote } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:leadId", validateNote, addNote);
router.get("/:leadId", getNotes);
router.delete("/:id", deleteNote);

export default router;
