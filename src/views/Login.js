import React, { useState } from 'react';
import styles from './Register.module.css';
import { userLoginFetch } from '../reducers/users';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const location = useLocation();
  const title = location?.state?.from ? location.state.from : null;
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(userLoginFetch(state));
  };

  console.log(title);
  return (
    <div className={styles.wrapper}>
      {title && <h1>Вы успешно зарегистрировались, войдите в систему</h1>}
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="email"
          value={state.email}
          onChange={handleChange}
        />
        <br />

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Логин</button>
      </form>
    </div>
  );
};

export default Login;
