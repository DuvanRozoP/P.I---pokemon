import './Presentation.css';
import styled from '../../Helpers/Animation.module.css';

import pokemons from '../../assets/wallpaper.png';

const Presentation = () => {
  return (
    <div className='containerPresentation'>
      <img
        className={`containerImgs ${styled.animationMoveLeftToRight}`}
        src={pokemons}
        alt='pokemons'
      />
      <div className={`containerTitle ${styled.animationMoveLeftToLeft}`}></div>
    </div>
  );
};

export default Presentation;