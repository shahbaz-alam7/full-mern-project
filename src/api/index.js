import axios from "axios";

const URL = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(URL);

export const createPost = (newPost) => axios.post(URL, newPost);

export const updatePost = (id, updatedData) =>
  axios.patch(`${URL}/${id}`, updatedData);

export const deletePost = (id) => axios.delete(`${URL}/${id}`);

export const likeCount = (id) => axios.patch(`${URL}/${id}/likePost`);
