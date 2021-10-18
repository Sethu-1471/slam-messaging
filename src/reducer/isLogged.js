const { toast } = require("react-toastify");
const { httpRequest } = require("../Api/httpRequest");

let initState = {
  logged: localStorage.getItem("logged") != null ? true : false,
  user:
    localStorage.getItem("user") != null
      ? JSON.parse(localStorage.getItem("user"))
      : null,
};
console.log({ initState });
const loggedReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(action.body);
      initState = {
        logged: true,
        user: action.user,
      };
      state = {
        logged: true,
        user: action.user,
      };
      return state;
    case "SIGN_UP":
      console.log(action.body);
      return state;
    case "SIGN_OUT":
      state = {
        logged: false,
        user: null,
      };
      initState = {
        logged: false,
        user: null,
      };
      toast("Logged Out", "success")
      return state;
    default:
      return state;
  }
};

const loggedStateReducer = () => initState.logged;

const getUser = () => initState.user;

module.exports = { loggedReducer, loggedStateReducer, getUser };
