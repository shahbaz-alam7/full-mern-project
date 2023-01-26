import { LOGOUT, AUTH } from "../../constants/actionTypes";

const reducers = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.removeItem("profile");
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default reducers;
