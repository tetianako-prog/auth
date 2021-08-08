export const userPostFetch = (user) => {
  return fetch("http://localhost:3000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  }).then((resp) => resp.json());
};
