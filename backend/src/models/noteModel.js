import pool from "../config/db.js";

export const addNoteToLead = async (leadId, content, createdBy) => {
  await pool.query(
    "INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)",
    [leadId, content, createdBy],
  );
};

export const getNotesByLeadId = async (leadId) => {
  const [notes] = await pool.query(
    "SELECT * FROM notes WHERE lead_id=? ORDER BY created_at DESC",
    [leadId],
  );

  return notes;
};

export const deleteNoteById = async (id) => {
  await pool.query("DELETE FROM notes WHERE id = ?", [id]);
};
