import axios from "axios";

const URL = "http://localhost:5000";

export const getPosts = () => {
  return axios.get(URL);
};
