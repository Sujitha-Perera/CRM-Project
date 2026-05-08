import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, TextField, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Paper
        elevation={0}
        className="glass-panel w-full max-w-md rounded-3xl p-8 shadow-soft"
      >
        <div className="mb-8 text-center">
          <Typography variant="h4" className="font-bold text-brand-900">
            CRM Pulse
          </Typography>
          <Typography variant="body2" className="mt-2 text-slate-600">
            Unified lead management and sales intelligence platform
          </Typography>
        </div>

        {error ? (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ py: 1.4, borderRadius: 3, textTransform: "none" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
