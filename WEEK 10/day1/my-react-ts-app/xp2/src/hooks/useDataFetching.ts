import { useState, useEffect, useRef, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface CacheConfig {
  maxAge: number; // Time in milliseconds
}

export function useDataFetching<T>(url: string, config: CacheConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // In-memory application cache map storing URLs against response data & timestamps
  const cacheRef = useRef<Map<string, CacheItem<T>>>(new Map());

  const fetchData = useCallback(async (ignoreCache: boolean = false) => {
    setLoading(true);
    setError(null);

    const now = Date.now();
    const cachedItem = cacheRef.current.get(url);

    // If cache is present and hasn't expired, apply directly without fetching
    if (!ignoreCache && cachedItem && now - cachedItem.timestamp < config.maxAge) {
      setData(cachedItem.data);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const json: T = await response.json();
      
      // Update local storage reference
      cacheRef.current.set(url, { data: json, timestamp: Date.now() });
      setData(json);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  }, [url, config.maxAge]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Force refetch bypassing cache
  const refetch = () => {
    fetchData(true);
  };

  // Evict specific cache item completely and fetch fresh data
  const invalidateCache = () => {
    cacheRef.current.delete(url);
    fetchData(true);
  };

  return { data, loading, error, refetch, invalidateCache };
}
