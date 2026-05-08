import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(14px)",
        color: "#1f2937",
        borderBottom: "1px solid rgba(139,92,246,0.12)",
      }}
    >
      <Toolbar className="flex items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <IconButton className="md:!hidden" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
          <div>
            <Typography variant="body2" className="text-slate-500">
              Welcome back
            </Typography>
            <Typography variant="h6" className="font-semibold text-brand-900">
              CRM Dashboard
            </Typography>
          </div>
        </div>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: "#6d28d9" }}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <div className="hidden text-right sm:block">
            <Typography variant="body2" className="font-medium">
              {user?.name || "User"}
            </Typography>
            <Typography variant="caption" className="text-slate-500">
              {user?.email || "user"}
            </Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 999, textTransform: "none" }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
