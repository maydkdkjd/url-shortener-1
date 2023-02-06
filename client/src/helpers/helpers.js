// import config from "../config/config"

const checkAuth = () => fetch(`http://localhost:5000/users/auth`, {
  method: 'POST',
  credentials: 'include',
  body: '',
  headers: {
    'Content-type': 'application/json'
  },
}).then(res => res.json());

/** 
 * Login the user with credentials in user object
 * @param {Object} user
 * @returns {Promise} Server response json
 */
const loginUser = (user) => fetch(`http://localhost:5000/users/login`, {
  method: 'POST',
  body: JSON.stringify(user),
  credentials: "include",
  headers: {
    'Content-type': 'application/json'
  },
}).then(res => res.json())

export { checkAuth, loginUser }
