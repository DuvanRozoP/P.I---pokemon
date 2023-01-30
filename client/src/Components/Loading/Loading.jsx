import './Loading.css';

const Loading = () => {
  return (
    <section className='containerLoading'>
      <section className='loading'>
        <div id='ball1'></div>
        <div id='ball2'></div>
      </section>
      <h1>Cargando...</h1>
    </section>
  );
};

export default Loading;
