const namespace = 'contacts';

const SET_CONTACTS = `${namespace}/SET_CONTACTS`;

const initialState = {
  contacts: [],
};

export const contactsSelector = state => state[namespace];

export default function ContactsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
}

export const setContacts = payload => ({
  type: SET_CONTACTS,
  payload,
});

export const userContactsFetch = user => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      return fetch('http://localhost:3000/api/contacts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(resp => resp.json())
        .then(res => dispatch(setContacts(res.data.contacts)));
    }
  };
};
