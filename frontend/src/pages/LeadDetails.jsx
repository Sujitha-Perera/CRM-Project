import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [leadResponse, notesResponse] = await Promise.all([
        api.get(`/leads/${id}`),
        api.get(`/notes/${id}`),
      ]);

      setLead(leadResponse.data.data);
      setNotes(notesResponse.data.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load lead details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const addNote = async (event) => {
    event.preventDefault();
    if (!note.trim()) return;

    await api.post(`/notes/${id}`, { content: note });
    setNote("");
    await loadData();
  };

  const deleteNote = async (noteId) => {
    await api.delete(`/notes/${noteId}`);
    await loadData();
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-soft">Loading...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Typography variant="h4" className="font-bold text-brand-900">
            Lead Profile
          </Typography>
          <Typography variant="body2" className="mt-1 text-slate-600">
            Complete lead information with conversation history and interaction
            timeline
          </Typography>
        </div>
        <Button
          component={Link}
          to="/leads"
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Back to Leads
        </Button>
      </div>

      {error ? <Alert severity="error">{error}</Alert> : null}

      {lead ? (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="glass-panel shadow-soft">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar sx={{ bgcolor: "#6d28d9", width: 56, height: 56 }}>
                  {lead.lead_name?.[0]?.toUpperCase() || "L"}
                </Avatar>
                <div>
                  <Typography variant="h5" className="font-bold text-brand-900">
                    {lead.lead_name}
                  </Typography>
                  <Typography variant="body2" className="text-slate-500">
                    {lead.company_name}
                  </Typography>
                </div>
              </div>

              <Divider />

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Email", lead.email],
                  ["Phone", lead.phone],
                  ["Lead Source", lead.lead_source],
                  ["Salesperson", lead.salesperson],
                  ["Status", lead.status],
                  [
                    "Deal Value",
                    `$${Number(lead.deal_value || 0).toLocaleString()}`,
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-brand-50 p-4">
                    <Typography variant="caption" className="text-slate-500">
                      {label}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="font-medium text-slate-900"
                    >
                      {value || "-"}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel shadow-soft">
            <CardContent>
              <Typography variant="h6" className="font-semibold text-brand-900">
                Activity Log
              </Typography>
              <form onSubmit={addNote} className="mt-4 space-y-3">
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Record an interaction or note"
                  placeholder="Document your conversation, follow-up action, or deal progress..."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Add Activity
                </Button>
              </form>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" className="font-semibold text-brand-900">
                Conversation History
              </Typography>

              <div className="mt-4 space-y-4">
                {notes.length === 0 ? (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                    No activity recorded yet. Start documenting interactions to
                    build a complete lead history.
                  </div>
                ) : (
                  notes.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-2xl border border-brand-100 bg-white p-4"
                    >
                      <div className="mt-1 h-3 w-3 rounded-full bg-brand-600" />
                      <div className="flex-1">
                        <Typography variant="body1" className="text-slate-900">
                          {item.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-slate-500"
                        >
                          {item.created_at
                            ? new Date(item.created_at).toLocaleString()
                            : ""}
                        </Typography>
                      </div>
                      <IconButton onClick={() => deleteNote(item.id)}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
