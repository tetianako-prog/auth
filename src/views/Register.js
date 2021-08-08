import React, { useState } from 'react';
import { userPostFetch } from '../services/api';
import styles from './Register.module.css';
import { useHistory } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};
const Register = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(state);
    const res = await userPostFetch(state);
    if (res.code === 201) {
      history.push('/login', { from: 'register' });
    } else {
      setError(res.message);
    }
    console.log(res);
  };
  return (
    <div className={styles.wrapper}>
      {error && <p className={styles.error}>{error}</p>}
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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
