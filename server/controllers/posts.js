import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

const router = express.Router();

//Server side HTTP Protocols//

// GET MULTIPLE POSTS //
export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // this is used to get the starting index of every page //
        const total = await postMessage.countDocuments({});

        // this is used to show the first eight latest posts from every page //
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        
        // the response will show all the data on the frontend //
        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// SEARCH POSTS //
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); // flag i is used to ignore uppercase or lowercase //

        //find all the posts that match the title or the tags //
        const posts = await postMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET SINGLE POST //

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



// POST //
export const createPost = async  (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


// PATCH //
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send(`No posts with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

// DELETE // 
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send(`No posts with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}


// LIKE //
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send(`No posts with id: ${id}`);
    
    const post = await PostMessage.findById(id);


    // added this so that the user may use the Like function once per post //
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
       post.likes.push(req.userId); // like the post //
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));  // returns all the likes the post has //
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post , { new: true });

    res.status(200).json(updatedPost);
}

export default router;