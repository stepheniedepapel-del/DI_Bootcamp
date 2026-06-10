import React from 'react';
import { ListProps } from '../types';

function GenericList<T>({ 
  items, 
  renderItem, 
  keyExtractor, 
  emptyMessage = "No items to display",
  className = ""
}: ListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={`generic-list ${className}`}>
      {items.map((item, index) => (
        <li key={keyExtractor(item)} className="list-item">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

export default GenericList;