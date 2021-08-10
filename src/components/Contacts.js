import React, { useEffect, useMemo, useState } from "react";
import AddContactForm from "./AddContactForm";
import {
  userContactsFetch,
  userRemoveContact,
  userChangeFavoriteContact,
  contactsSelector,
} from "../reducers/contacts";
import { userSelector, changeUserSubscription } from "../reducers/users";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(userContactsFetch()), [dispatch]);
  const { contacts } = useSelector(contactsSelector);
  const { subscription } = useSelector(userSelector);
  const removeContact = (id) => {
    dispatch(userRemoveContact(id));
  };

  const favoriteContacts = useMemo(
    () => contacts.filter((item) => item.favorite),
    [contacts]
  );

  const notFavoriteContacts = useMemo(
    () => contacts.filter((item) => !item.favorite),
    [contacts]
  );

  const changeFavorite = (id, favorite) => {
    dispatch(userChangeFavoriteContact(id, favorite));
  };

  const [subscrState, setSubsctiptionState] = useState("starter");

  const handleChange = (e) => {
    setSubsctiptionState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserSubscription({ subscription: subscrState }));
  };

  return (
    <div>
      <h1>This is contacts page</h1>
      <p>
        Your subscription is <strong>{subscription}</strong>
      </p>
      <p>Change your subscription</p>
      <form onSubmit={handleSubmit}>
        <select value={subscrState} onChange={handleChange}>
          <option value="starter">starter</option>
          <option value="pro">pro</option>
          <option value="business">business</option>
        </select>
        <button type="submit">Change</button>
      </form>
      {contacts.length === 0 && <h3>You have no contacts yet</h3>}
      {favoriteContacts.length > 0 && (
        <>
          <h3>Favorite contacts</h3>
          <ul>
            {favoriteContacts.map((item) => (
              <li key={item.email}>
                <ul className={styles.nestedList}>
                  <li>name: {item.name}</li>
                  <li>email: {item.email}</li>
                  <li>phone: {item.phone}</li>
                  <li>
                    <button
                      type="button"
                      onClick={() => removeContact(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        changeFavorite(item._id, { favorite: !item.favorite })
                      }
                    >
                      Remove from favorite
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
      {notFavoriteContacts.length > 0 && (
        <>
          <h3>Contacts</h3>
          <ul>
            {notFavoriteContacts.map((item) => (
              <li key={item.email}>
                <ul className={styles.nestedList}>
                  <li>name: {item.name}</li>
                  <li>email: {item.email}</li>
                  <li>phone: {item.phone}</li>
                  <li>
                    <button
                      type="button"
                      onClick={() => removeContact(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        changeFavorite(item._id, { favorite: !item.favorite })
                      }
                    >
                      Add to favorite
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}

      <AddContactForm />
    </div>
  );
};

export default Contacts;
