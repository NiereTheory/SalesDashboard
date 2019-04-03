import { Pagination } from "./pagination";
interface PagedResponse<T> {
    data: T[];
    pagination: Pagination;
}

export { PagedResponse };