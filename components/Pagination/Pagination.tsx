'use client';

// Styles
import css from './Pagination.module.css';

// React components
import ReactPaginate from 'react-paginate';

// Types
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  return (
    <nav aria-label='Pagination' data-loading={isLoading}>
      <ReactPaginate
        pageCount={totalPages}
        forcePage={Math.max(0, page - 1)}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        previousLabel='←'
        nextLabel='→'
        breakLabel='...'
        containerClassName={css.pagination}
        pageClassName={css.page}
        pageLinkClassName={css.pageLink}
        activeClassName={css.active}
        disabledClassName={css.disabled}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
}
