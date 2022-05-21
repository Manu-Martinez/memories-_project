import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//Server side HTTP Protocols//

// GET //
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// POST //
export const createPost = async  (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


// PATCH //
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) 
    return res.status(404).send('No posts with that id' );

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

// DELETE // 
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send('No posts with that id' );

    await postMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}


// LIKE //
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send('No posts with that id' );
     
    const post = await PostMessage.findById(id);
    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

    res.json(updatedPost);
}