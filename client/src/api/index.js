import axios from 'axios';


//url pointing to the backend route //
const url = 'http//:localhost:3000/posts';

//GET method //
export const fetchPosts = () => axios.get(url);

// POST method//
export const createPost = (newPost) => axios.post(url, newPost);


