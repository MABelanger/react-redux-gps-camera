import React from 'react'
import { browserHistory, Router, IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

// Load the mediaStream Page by default
browserHistory.push('/mediaStream');

/*
<Link to='/locator' activeClassName='page-layout__nav-item--active'>locator</Link>
{' · '}
<IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
{' · '}
<Link to='/chat' activeClassName='page-layout__nav-item--active'>chat</Link>
*/
export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <h1>Media Locator</h1>
    <Link to='/mediaStream' activeClassName='page-layout__nav-item--active'>1. mediaStream</Link>
    {' · '}
    <Link to='/placeLocator' activeClassName='page-layout__nav-item--active'>2. placeLocator</Link>
    {' · '}
    <Link to='/itemDetail' activeClassName='page-layout__nav-item--active'>3. itemDetail</Link>
    {' · '}
    <Link to='/sendItem' activeClassName='page-layout__nav-item--active'>4. sendItem</Link>
    {' · '}
    <Link to='/searchItem' activeClassName='page-layout__nav-item--active'>5. searchItem</Link>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
