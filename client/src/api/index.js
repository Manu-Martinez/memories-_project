import axios from 'axios';


//url pointing to the backend route //
const url = 'http//:localhost:3000/posts';

export const fetchPosts = () => axios.get(url);


