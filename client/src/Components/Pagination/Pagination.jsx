import './Pagination.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Pagination = ({ setRender }) => {
  const [page, setPage] = useState(0);
  const stateGlobal = useSelector((state) => state.filters);
  const handlerSlice = (array, start, end) => array.slice(start, end);

  useEffect(() => {
    handlerRender(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateGlobal, page]);

  const handlerRender = (pageCurrent) => {
    const start = pageCurrent * 12;
    const end = start + 12;
    setRender(handlerSlice(stateGlobal, start, end));
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < stateGlobal?.length / 12 && nextPage >= 0) {
      setPage(nextPage);
    }
  };

  return (
    <section className='containerPagination'>
      <button onClick={() => handlePageChange(page - 1)}> {'<'} </button>
      <button
        className={page - 1 === -1 ? 'desactive' : ''}
        onClick={() => handlePageChange(page - 1)}
      >
        {page - 1}
      </button>
      <button onClick={() => handlePageChange(page)}> {page} </button>
      <button
        className={page + 1 === stateGlobal?.length / 12 ? 'desactive' : ''}
        onClick={() => handlePageChange(page + 1)}
      >
        {page + 1}
      </button>
      <button onClick={() => handlePageChange(page + 1)}> {'>'} </button>
    </section>
  );
};

export default Pagination;
