import React, { useEffect } from 'react';
import { userContactsFetch, contactsSelector } from '../reducers/contacts';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Contacts.module.css';

const Contacts = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(userContactsFetch()), [dispatch]);
  const { contacts } = useSelector(contactsSelector);
  return (
    <div>
      <h1>This is contacts page</h1>
      <ul>
        {contacts.length === 0 ? (
          <h3>You have no contacts yet</h3>
        ) : (
          contacts.map(item => (
            <li key={item.email}>
              <ul className={styles.nestedList}>
                <li>name: {item.name}</li>
                <li>email: {item.email}</li>
                <li>phone: {item.phone}</li>
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Contacts;
