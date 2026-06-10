import React from 'react';
import { useDataFetching } from '../hooks/useDataFetching';
import { DataTable, TableColumn, Identifiable } from './DataTable';

// Match API structure returned from placeholder endpoints while satisfying Table dependencies
interface User extends Identifiable {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export const UserDashboard: React.FC = () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  // Cache data configuration set to valid window of 1 minute (60,000 ms)
  const { data: users, loading, error, refetch, invalidateCache } = useDataFetching<User[]>(url, { maxAge: 60000 });

  const columns: TableColumn<User>[] = [
    { title: 'ID', key: 'id', sortable: true },
    { title: 'Full Name', key: 'name', sortable: true },
    { title: 'Email Address', key: 'email', sortable: true },
    { title: 'Phone Number', key: 'phone' },
  ];

  const handleSelectionChange = (selectedIds: (string | number)[]) => {
    console.log('Selected Row Keys:', selectedIds);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>System User Registry Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={refetch} style={{ marginRight: '10px', padding: '8px 12px' }}>
          🔄 Refresh (Check Cache)
        </button>
        <button onClick={invalidateCache} style={{ padding: '8px 12px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🗑️ Invalidate Cache & Hard Reset
        </button>
      </div>

      {loading && <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Fetching Data... Please wait.</div>}
      {error && <div style={{ color: 'red', margin: '10px 0' }}>⚠️ Failure detected: {error}</div>}

      {!loading && !error && users && (
        <DataTable data={users} columns={columns} onSelect={handleSelectionChange} />
      )}
    </div>
  );
};
