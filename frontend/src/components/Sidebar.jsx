import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 288;

const items = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardOutlinedIcon /> },
  { label: "Leads", path: "/leads", icon: <ViewKanbanOutlinedIcon /> },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const drawerContent = (
    <div className="h-full border-r border-white/30 bg-white/85 backdrop-blur-xl">
      <div className="border-b border-brand-100 px-6 py-6 text-center">
        <Typography variant="h5" className="font-semibold text-brand-800">
          CRM Pulse
        </Typography>
        <p className="mt-2 text-xs font-medium text-brand-600">
          Sales Intelligence
        </p>
      </div>

      <List className="px-3 py-4">
        {items.map((item) => {
          const active = location.pathname.startsWith(item.path);

          return (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (!isDesktop) {
                  onClose?.();
                }
              }}
              className={
                active
                  ? "!mb-2 !rounded-2xl !bg-brand-700 !text-white"
                  : "!mb-2 !rounded-2xl"
              }
            >
              <ListItemIcon
                className={active ? "!text-white" : "!text-brand-700"}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop ? true : open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: {
          width: drawerWidth,
          borderRight: "none",
          backgroundColor: "transparent",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
