import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography, Skeleton } from "@mui/material";
import api from "../services/api.js";

const cards = [
  {
    key: "total_leads",
    label: "Total Leads",
    accent: "from-brand-700 to-violet-500",
  },
  {
    key: "new_leads",
    label: "New Leads",
    accent: "from-fuchsia-600 to-brand-600",
  },
  {
    key: "qualified_leads",
    label: "Qualified Leads",
    accent: "from-violet-700 to-indigo-500",
  },
  {
    key: "won_leads",
    label: "Won Leads",
    accent: "from-emerald-600 to-brand-600",
  },
  {
    key: "lost_leads",
    label: "Lost Leads",
    accent: "from-rose-600 to-pink-500",
  },
  {
    key: "total_deal_value",
    label: "Total Deal Value",
    accent: "from-brand-800 to-fuchsia-500",
  },
  {
    key: "won_deal_value",
    label: "Won Deal Value",
    accent: "from-indigo-700 to-brand-500",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setStats(response.data.data);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h4" className="font-bold text-brand-900">
          Sales Dashboard
        </Typography>
        <Typography variant="body2" className="mt-1 text-slate-600">
          Track your sales pipeline, deal progress, and team performance at a
          glance
        </Typography>
      </div>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.key}>
            <Card className="glass-panel h-full shadow-soft">
              <CardContent>
                <div
                  className={`mb-4 h-2 rounded-full bg-gradient-to-r ${card.accent}`}
                />
                <Typography variant="body2" className="text-slate-500">
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  className="mt-2 font-bold text-brand-900"
                >
                  {loading ? (
                    <Skeleton width={80} />
                  ) : (
                    Number(stats?.[card.key] || 0).toLocaleString()
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
