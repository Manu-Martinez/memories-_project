import axios from 'axios';


//url pointing to the backend route //
const url = 'http//:localhost:3000/posts';

//GET route //
export const fetchPosts = () => axios.get(url);

// POST route //
export const createPost = (newPost) => axios.post(url, newPost);

// PATCH route //
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id} `, updatedPost);

// DELETE route //
export const deletePost = (id) => axios.delete(`${url}/${id} `);