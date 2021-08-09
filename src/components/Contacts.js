import React, { useEffect, useMemo } from "react";
import AddContactForm from "./AddContactForm";
import {
  userContactsFetch,
  userRemoveContact,
  userChangeFavoriteContact,
  contactsSelector,
} from "../reducers/contacts";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(userContactsFetch()), [dispatch]);
  const { contacts } = useSelector(contactsSelector);
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
  console.log(favoriteContacts);
  console.log(notFavoriteContacts);
  return (
    <div>
      <h1>This is contacts page</h1>
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
