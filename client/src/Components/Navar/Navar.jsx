import './Navar.css';
import iconNavar from '../../assets/iconNavar.png';
import styled from '../../Helpers/Animation.module.css';
import { Link } from 'react-router-dom';

const Navar = () => {
  return (
    <section className={`containerNavar ${styled.animationMoveLeftToRight}`}>
      <Link to='/home'>
        <img src={iconNavar} alt='iconNavar' />
      </Link>
    </section>
  );
};

export default Navar;
