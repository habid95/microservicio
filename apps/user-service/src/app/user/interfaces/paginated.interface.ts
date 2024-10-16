export interface PaginatedResult<T> {
  page: number;
  limit: number;
  hasMore: boolean;
  data: T[];
}
