import { useState, useEffect } from 'react';
import alunniApi from '../api/alunnoApi';

const EMPTY_STATS = {
  newProfilesToday: 0,
  newProfilesLast7Days: 0,
  currentMonthProfiles: 0,
  previousMonthProfiles: 0,
  profileGrowth: 0,
  growthPercentage: 0,
  activeUsers30Days: 0,
  inactiveUsers90Days: 0,
  onlineUsers: 0,
  monthlyTrend: [],
};

export function useDashboardStats() {
  const [stats, setStats] = useState(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    alunniApi
      .getDashboardStats()
      .then((res) => {
        if (mounted) setStats({ ...EMPTY_STATS, ...(res.data || {}) });
      })
      .catch((err) => {
        if (mounted) setError(err.response?.data?.message || err.message || 'Errore sconosciuto');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { stats, loading, error };
}