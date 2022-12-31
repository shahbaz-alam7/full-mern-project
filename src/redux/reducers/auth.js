import { LOGOUT, AUTH } from "../../constants/actionTypes";

const reducers = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.payload };
    case LOGOUT:
      localStorage.removeItem("profile");
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};
// const authReducer = (state = { authData: null }, action) => {
//   switch (action.type) {
//     case AUTH:
//       console.log(`Auth ${action.paylaod}`);
// localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

//       return { ...state, authData: action.data, loading: false, errors: null };
//     case LOGOUT:
//       localStorage.clear();

//       return { ...state, authData: null, loading: false, errors: null };
//     default:
//       return state;
//   }
// };

export default reducers;
