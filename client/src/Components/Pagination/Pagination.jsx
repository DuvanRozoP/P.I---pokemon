import './Pagination.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePage } from '../../Redux/actions/actions';

const Pagination = ({ page }) => {
  const dispatch = useDispatch();
  const stateGlobalPage = useSelector((state) => state.page);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    if (stateGlobalPage !== page) handlerRender(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlerRender = (pageCurrent) => dispatch(updatePage(pageCurrent));
  const handlePageChange = (nextPage) => {
    if (nextPage <= filters?.length - 1 && nextPage >= 0) handlerRender(nextPage);
  };

  return (
    <section className='containerPagination'>
      <button onClick={() => handlePageChange(page - 1)}> {'<'} </button>
      <button
        onClick={() => handlePageChange(page - 1)}
        className={page - 1 === -1 ? 'desactive' : ''}
      >
        {page - 1}
      </button>
      <button onClick={() => handlePageChange(page)}> {page} </button>
      <button
        onClick={() => handlePageChange(page + 1)}
        className={page + 1 === filters?.length ? 'desactive' : ''}
      >
        {page + 1}
      </button>
      <button onClick={() => handlePageChange(page + 1)}> {'>'} </button>
    </section>
  );
};

export default Pagination;
