import { http } from '@src/services/http';
import { useEffect, useState } from 'react';

export function useFetch<T>(url: string, initState?: T) {
  const [result, setResult] = useState<T | undefined>(initState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHealthCheck = async () => {
      setLoading(true);
      await http
        .get<T>(url)
        .then(({ data }) => {
          setResult(data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getHealthCheck();
  }, [url]);

  return { data: result, error, loading };
}
