import React, { useEffect } from 'react';

// Define props using TypeScript Generics <T>
interface DataFetcherProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  fetchData: () => void;
  renderItem: (item: T) => React.ReactNode;
}

export function DataFetcher<T>({
  data,
  loading,
  error,
  fetchData,
  renderItem,
}: DataFetcherProps<T>) {
  
  // Trigger data fetch on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading data, please wait...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', padding: '20px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
