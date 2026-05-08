import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import LeadTable from "../components/LeadTable.jsx";
import LeadFormModal from "../components/LeadFormModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const filtersInitial = {
  search: "",
  status: "",
  lead_source: "",
  salesperson: "",
};

const statusOptions = [
  "",
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState(filtersInitial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const queryParams = useMemo(() => filters, [filters]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/leads", { params: queryParams });
        setLeads(response.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load leads");
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [queryParams]);

  const openCreate = () => {
    setEditingLead(null);
    setModalOpen(true);
  };

  const openEdit = (lead) => {
    setEditingLead(lead);
    setModalOpen(true);
  };

  const openDelete = (lead) => {
    setSelectedLead(lead);
    setDeleteDialog(true);
  };

  const saveLead = async (payload) => {
    if (editingLead) {
      await api.put(`/leads/${editingLead.id}`, payload);
    } else {
      await api.post("/leads", payload);
    }

    setModalOpen(false);
    setEditingLead(null);

    const response = await api.get("/leads", { params: queryParams });
    setLeads(response.data.data);
  };

  const confirmDelete = async () => {
    if (!selectedLead) return;

    await api.delete(`/leads/${selectedLead.id}`);
    setDeleteDialog(false);
    setSelectedLead(null);

    const response = await api.get("/leads", { params: queryParams });
    setLeads(response.data.data);
  };

  const updateLeadStatus = async (lead, status) => {
    await api.put(`/leads/${lead.id}`, { ...lead, status });
    const response = await api.get("/leads", { params: queryParams });
    setLeads(response.data.data);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Typography variant="h4" className="font-bold text-brand-900">
            Lead Management
          </Typography>
          <Typography variant="body2" className="mt-1 text-slate-600">
            Manage your sales pipeline with real-time lead tracking and status
            updates
          </Typography>
        </div>

        <Button
          variant="contained"
          onClick={openCreate}
          sx={{ borderRadius: 999, textTransform: "none" }}
        >
          + New Lead
        </Button>
      </div>

      <div className="glass-panel rounded-3xl p-4 shadow-soft md:p-5">
        <Typography
          variant="subtitle2"
          className="mb-3 font-semibold text-slate-700"
        >
          Search & Filter
        </Typography>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <TextField
            fullWidth
            label="Search leads"
            placeholder="Name, company, or email..."
            value={filters.search}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, search: event.target.value }))
            }
          />

          <TextField
            fullWidth
            select
            label="Pipeline Status"
            value={filters.status}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, status: event.target.value }))
            }
          >
            {statusOptions.map((status) => (
              <MenuItem key={status || "all-statuses"} value={status}>
                {status || "All Statuses"}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Source"
            placeholder="Filter by source..."
            value={filters.lead_source}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                lead_source: event.target.value,
              }))
            }
          />

          <TextField
            fullWidth
            label="Assigned To"
            placeholder="Filter by salesperson..."
            value={filters.salesperson}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                salesperson: event.target.value,
              }))
            }
          />
        </div>

        <div className="mt-3 flex justify-end">
          <Button
            variant="text"
            onClick={() => setFilters(filtersInitial)}
            sx={{ textTransform: "none", color: "#6d28d9" }}
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <LeadTable
        leads={leads}
        onEdit={openEdit}
        onDelete={openDelete}
        onStatusChange={updateLeadStatus}
        onView={(lead) => navigate(`/leads/${lead.id}`)}
      />

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveLead}
        initialData={editingLead}
      />

      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete lead?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will permanently remove the selected lead.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
