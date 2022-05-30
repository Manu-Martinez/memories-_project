import axios from 'axios';


//url pointing to the backend route  //
const API = axios.create({ baseURL: 'http://localhost:3000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

//GET endpoint single post//
export const fetchPost = (id) => API.get(`/posts/${id}`);


//GET endpoint multiple posts//
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);


// SEARCH endpoint //
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags} `);

// POST endpoint //
export const createPost = (newPost) => API.post('/posts', newPost);

// PATCH endpoint //
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

// LIKE endpoint //
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); 

// DELETE endpoint //
export const deletePost = (id) => API.delete(`/posts/${id}`);

// SIGN IN endpoint //
export const signIn = (formData) => API.post('/user/signin', formData);

// SIGN UP endpoint //
export const signUp = (formData) => API.post('/user/signup', formData);



