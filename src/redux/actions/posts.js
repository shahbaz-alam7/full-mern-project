import * as api from "../../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({
      type: "FETCH_ALL",
      payload: [],
    });
  } catch (error) {
    console.log("Error Fetch_all from action/posts", error.message);
  }
};
