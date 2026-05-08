import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

const emptyForm = {
  lead_name: "",
  company_name: "",
  email: "",
  phone: "",
  lead_source: "",
  salesperson: "",
  status: "New",
  deal_value: "",
};

const statusOptions = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function LeadFormModal({ open, onClose, onSave, initialData }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        lead_name: initialData.lead_name || "",
        company_name: initialData.company_name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        lead_source: initialData.lead_source || "",
        salesperson: initialData.salesperson || "",
        status: initialData.status || "New",
        deal_value: initialData.deal_value ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...form, deal_value: Number(form.deal_value) || 0 });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="font-bold text-brand-900">
        {initialData ? "Edit Lead Information" : "Create New Lead"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {[
            ["lead_name", "Full Lead Name"],
            ["company_name", "Company"],
            ["email", "Email Address"],
            ["phone", "Phone Number"],
            ["lead_source", "Lead Source"],
            ["salesperson", "Assigned To"],
          ].map(([name, label]) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                required
                label={label}
                name={name}
                value={form[name]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Pipeline Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Estimated Deal Value (₹)"
              name="deal_value"
              type="number"
              value={form.deal_value}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Update Lead" : "Create Lead"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
