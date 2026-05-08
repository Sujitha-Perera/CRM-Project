import {
  addNoteToLead,
  deleteNoteById,
  getNotesByLeadId,
} from "../models/noteModel.js";

// ADD NOTE
export const addNote = async (req, res) => {
  try {
    const { leadId } = req.params;

    await addNoteToLead(leadId, req.body.content, req.user.id);

    res.status(201).json({
      success: true,
      message: "Note added",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET NOTES
export const getNotes = async (req, res) => {
  try {
    const { leadId } = req.params;

    const notes = await getNotesByLeadId(leadId);

    res.json({
      success: true,
      message: "Notes fetched",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteNoteById(id);

    res.json({
      success: true,
      message: "Note deleted",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
