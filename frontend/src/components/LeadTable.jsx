import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const statusOptions = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function LeadTable({
  leads,
  onEdit,
  onDelete,
  onStatusChange,
  onView,
}) {
  return (
    <TableContainer component={Paper} className="glass-panel shadow-soft">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Lead</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Salesperson</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Value</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No leads found
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id} hover>
                <TableCell className="font-medium text-slate-900">
                  {lead.lead_name}
                </TableCell>
                <TableCell>{lead.company_name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.salesperson}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={lead.status || "New"}
                    onChange={(event) =>
                      onStatusChange(lead, event.target.value)
                    }
                    sx={{ minWidth: 140 }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  ₹{Number(lead.deal_value || 0).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View">
                    <IconButton onClick={() => onView(lead)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(lead)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(lead)}>
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1, textTransform: "none" }}
                    onClick={() => onView(lead)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
