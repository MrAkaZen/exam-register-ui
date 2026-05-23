import { useState, useEffect } from 'react';
import { alunnoApi } from '../api/alunnoApi';

export function useAlunni() {
  const [alunni, setAlunni]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    alunnoApi.getAll()
      .then((res) => setAlunni(res.data))
      .catch((err) => setError(err.response?.data?.message))
      .finally(() => setLoading(false));
  }, []);

  return { alunni, loading, error };
}