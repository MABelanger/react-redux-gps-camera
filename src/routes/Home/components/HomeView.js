import React from 'react';
import { Link } from 'react-router';
import DuckImage from '../assets/Duck.jpg';
import './HomeView.scss';

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />

    <Link to='/searchItem'> Search items</Link> OR
    <Link to='/mediaStream'> Add items</Link>
  </div>
)

export default HomeView
