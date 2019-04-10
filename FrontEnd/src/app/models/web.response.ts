import { Pagination } from './pagination';

export interface WebResponse<T> {
    data: T[];
    pagination?: Pagination;
}
