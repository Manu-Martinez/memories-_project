import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

//Server side HTTP Protocols//

// GET MULTIPLE POSTS //
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
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

    if(!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).send('No posts with that id' );
    
    const post = await PostMessage.findById(id);


    // added this so that the user may use the Like function once per post //
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if(index === -1) {
       post.likes.push(req.userId); // like the post //
    } else {
        post.likes = post.likes.filter((id) => id != String(req.userId));  // returns all the likes the post has //
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post , { new: true })

    res.json(updatedPost);
}