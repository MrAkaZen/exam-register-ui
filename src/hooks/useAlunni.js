import { useState, useEffect } from 'react';
import alunnoApi from '../api/alunnoApi';

export function useAlunni() {
  const [alunni, setAlunni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    alunnoApi
      .getAll()
      .then((res) => {
        if (mounted) setAlunni(Array.isArray(res.data) ? res.data : []);
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

  return { alunni, setAlunni, loading, error };
}