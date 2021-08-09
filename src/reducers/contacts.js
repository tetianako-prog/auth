const namespace = "contacts";

const SET_CONTACTS = `${namespace}/SET_CONTACTS`;
const UPDATE_CONTACTS = `${namespace}/UPDATE_CONTACTS`;
const SET_ERROR = `${namespace}/SET_ERROR`;
const DELETE_CONTACT = `${namespace}/DELETE_CONTACT`;
const UPDATE_FAVORITE = `${namespace}/UPDATE_FAVORITE`;

const initialState = {
  contacts: [],
  error: "",
};

export const contactsSelector = (state) => state[namespace];

export default function ContactsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    case UPDATE_CONTACTS:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((item) => item._id !== action.payload),
      };
    case UPDATE_FAVORITE:
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item._id === action.payload) {
            return { ...item, favorite: !item.favorite };
          } else {
            return item;
          }
        }),
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const setContacts = (payload) => ({
  type: SET_CONTACTS,
  payload,
});

export const updateContacts = (payload) => ({
  type: UPDATE_CONTACTS,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const deleteContact = (payload) => ({
  type: DELETE_CONTACT,
  payload,
});

export const updateFavorite = (payload) => ({
  type: UPDATE_FAVORITE,
  payload,
});

export const userContactsFetch = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      return fetch("http://localhost:3001/api/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((res) => dispatch(setContacts(res.data.contacts)));
    }
  };
};

export const userAddContact = (contact) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      return fetch("http://localhost:3001/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact),
      })
        .then((resp) => resp.json())
        .then((res) => {
          if (res.code === 201) {
            dispatch(setError(""));
            dispatch(updateContacts(res.data.contact));
          } else {
            dispatch(setError(res.message));
          }
          return res;
        })
        .catch((err) => console.log(err));
    }
  };
};

export const userRemoveContact = (id) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      return fetch(`http://localhost:3001/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((res) => {
          console.log(res);
          dispatch(deleteContact(id));
        })
        .catch((err) => console.log(err));
    }
  };
};

export const userChangeFavoriteContact = (id, favorite) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      return fetch(`http://localhost:3001/api/contacts/${id}/favorite`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favorite),
      })
        .then((resp) => resp.json())
        .then((res) => {
          console.log(res);
          dispatch(updateFavorite(id));
        })
        .catch((err) => console.log(err));
    }
  };
};
