import { useState, useEffect, useCallback } from "react";
import { ErrorContent } from "../core/error/domain/Error";

interface UseServiceOptions {
  dependencies?: any[];
}

export const useService = <T>(serviceFunction: () => Promise<T>, options: UseServiceOptions = {}) => {
  const { dependencies = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorContent | null>(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFunction();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError({ code: 'Error', message: err.message });
      } else {
        setError({ code: 'Unknown', message: 'Unknown error' });
      }
    } finally {
      setLoading(false);
    }
  }, [serviceFunction]);

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [...dependencies]);

  return { data, loading, error, fetchData };
};
