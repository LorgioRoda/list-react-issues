import { useState, useEffect, useCallback } from "react";

interface UseServiceOptions {
  lazy?: boolean;
  dependencies?: any[];
}

export const useService = <T>(serviceFunction: () => Promise<T>, options: UseServiceOptions = {}) => {
  const { lazy = false, dependencies = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!lazy);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFunction();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [serviceFunction]);

  useEffect(() => {
    if (!lazy) {
      fetchData();
    }
  }, [...dependencies]);

  return { data, loading, error, fetchData };
};
