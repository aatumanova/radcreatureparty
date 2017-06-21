import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = props => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink
            activeClassName="is-active"
            to="/creature-creator">
            <strong>Creature Creator</strong>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="is-active"
            to="/artists">
            <strong>Artists</strong>
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="is-active"
            to="/about">
            <strong>About</strong>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
