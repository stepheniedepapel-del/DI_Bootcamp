import React, { useState } from 'react';

// Require every data item to have at least an id property
export interface Identifiable {
  id: string | number;
}

export interface TableColumn<T> {
  title: string;
  key: keyof T;
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

interface SortConfig<T> {
  key: keyof T | null;
  direction: SortDirection;
}

interface DataTableProps<T extends Identifiable> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (key: keyof T, direction: SortDirection) => void;
  onSelect?: (selectedIds: (string | number)[]) => void;
}

export function DataTable<T extends Identifiable>({
  data,
  columns,
  onSort,
  onSelect,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: null });
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  // Handle row sorting state toggles
  const handleSort = (key: keyof T) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }

    setSortConfig({ key: direction ? key : null, direction });
    if (onSort) onSort(key, direction);
  };

  // Handle single item checking
  const handleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
    if (onSelect) onSelect(Array.from(newSelected));
  };

  // Handle master toggle selection checkbox
  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      if (onSelect) onSelect([]);
    } else {
      const allIds = data.map((item) => item.id);
      setSelectedRows(new Set(allIds));
      if (onSelect) onSelect(allIds);
    }
  };

  // local client-side sorting logic if no external parent onSort callback is passed
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;
    const targetKey = sortConfig.key;
    const dirModifier = sortConfig.direction === 'asc' ? 1 : -1;

    return [...data].sort((a, b) => {
      if (a[targetKey] < b[targetKey]) return -1 * dirModifier;
      if (a[targetKey] > b[targetKey]) return 1 * dirModifier;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
          <th style={{ padding: '10px' }}>
            <input
              type="checkbox"
              checked={data.length > 0 && selectedRows.size === data.length}
              onChange={handleSelectAll}
            />
          </th>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key)}
              style={{ cursor: col.sortable ? 'pointer' : 'default', padding: '10px' }}
            >
              {col.title}
              {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '10px' }}>
              <input
                type="checkbox"
                checked={selectedRows.has(item.id)}
                onChange={() => handleSelectRow(item.id)}
              />
            </td>
            {columns.map((col) => (
              <td key={String(col.key)} style={{ padding: '10px' }}>
                {String(item[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
