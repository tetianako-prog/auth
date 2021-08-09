import React, { useState } from "react";
import styles from "./AddContactForm.module.css";
import { userAddContact } from "../reducers/contacts";
import { useDispatch, useSelector } from "react-redux";
import { contactsSelector } from "../reducers/contacts";

const initialState = {
  name: "",
  email: "",
  phone: "",
};
const AddContactForm = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { error } = useSelector(contactsSelector);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const res = await dispatch(userAddContact(state));
    if (res.code === 201) {
      setState(initialState);
    }
  };

  return (
    <>
      <h2>Add new contact</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.addForm} onSubmit={onSubmitForm}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="name"
          value={state.name}
          onChange={handleChange}
        />
        <br />
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
        <label className={styles.label}>Phone</label>
        <input
          className={styles.input}
          type="phone"
          name="phone"
          placeholder="phone"
          value={state.phone}
          onChange={handleChange}
        />
        <button className={styles.addBtn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default AddContactForm;
