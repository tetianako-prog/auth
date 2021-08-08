import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { userSelector, userLogoutFetch } from '../reducers/users';
import { useDispatch } from 'react-redux';

const Navigation = () => {
  const { token, currentUser } = useSelector(userSelector);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userLogoutFetch());
  };

  return (
    <ul className={styles.list}>
      {!token && (
        <li className={styles.item}>
          <NavLink
            to="/register"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Register
          </NavLink>
        </li>
      )}
      {!token && (
        <li className={styles.item}>
          <NavLink
            to="/login"
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Login
          </NavLink>
        </li>
      )}
      <li>
        {token && (
          <span>
            Welcome {currentUser}{' '}
            <button type="button" onClick={logout}>
              Logout
            </button>
          </span>
        )}
      </li>
    </ul>
  );
};

export default Navigation;
