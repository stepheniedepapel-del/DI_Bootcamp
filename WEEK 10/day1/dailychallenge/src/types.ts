export interface Book {
  id: number;
  title: string;
  author: string;
  genre?: string;
  year?: number;
}

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
}

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
  className?: string;
}