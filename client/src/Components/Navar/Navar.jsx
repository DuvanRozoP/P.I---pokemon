import './Navar.css';
import styled from '../../Helpers/Animation.module.css';
import { Link } from 'react-router-dom';

// * icons
import iconNavar from '../../assets/iconNavar.png';
import iconNew from '../../assets/icon_new.png';
import iconList from '../../assets/icon _Layer .png';

const Navar = () => {
  return (
    <section className={`containerNavar ${styled.animationMoveLeftToRight}`}>
      <Link to='/'>
        <img src={iconNavar} alt='iconNavar' />
      </Link>
      <Link to='/home'>
        <img src={iconList} alt='iconNavar' />
      </Link>
      <Link to='/create'>
        <img src={iconNew} alt='iconNavar' />
      </Link>
    </section>
  );
};

export default Navar;
