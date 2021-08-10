const namespace = "user";

const SET_USER = `${namespace}/SET_USER`;
const SET_TOKEN = `${namespace}/SET_TOKEN`;
const SET_SUBSCRIPTION = `${namespace}/SET_SUBSCRIPTION`;

const initialState = {
  currentUser: "",
  subscription: "",
  token: "",
};

export const userSelector = (state) => state[namespace];

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_SUBSCRIPTION:
      return { ...state, subscription: action.payload };
    default:
      return state;
  }
}

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setSubscription = (payload) => ({
  type: SET_SUBSCRIPTION,
  payload,
});

export const userLoginFetch = (user) => {
  return (dispatch) => {
    return fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data.user.email));
        dispatch(setToken(res.data.token));
        dispatch(setSubscription(res.data.user.subscription));
        localStorage.setItem("token", res.data.token);
      });
  };
};

export const getProfileFetch = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      return fetch("http://localhost:3001/api/users/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((res) => {
          if (res.code === 200) {
            console.log(res.data.message);
            console.log(res.data.email);
            dispatch(setToken(token));
            dispatch(setUser(res.data.email));
            dispatch(setSubscription(res.data.subscription));
          } else {
            console.log("Токен недействительный");
            localStorage.removeItem("token");
          }
        });
    }
  };
};

export const userLogoutFetch = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      return fetch("http://localhost:3001/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.status === 204) {
          console.log("Logouted");
          localStorage.removeItem("token");
          dispatch(setToken(null));
          dispatch(setUser(null));
          dispatch(setSubscription(null));
        }
      });
    }
  };
};

export const changeUserSubscription = (subscr) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      return fetch("http://localhost:3001/api/users/subscription", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subscr),
      })
        .then((resp) => resp.json())
        .then((res) => {
          if (res.code === 200) {
            dispatch(setSubscription(res.data.subscription));
          }
        });
    }
  };
};
