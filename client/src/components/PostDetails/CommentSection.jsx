import React from "react";
import { useState, useRef } from "react";
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";


const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));


    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterbottom variant="h6" >Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterbottom variant="subtitle1" >
                            {c}
                        </Typography>
                    ))}
                </div>
                { user?.result?.name && (   //if there's a user, show the create comment section//
                <div style={{ width: '70%'}}>
                    <Typography gutterBottom variant="h6" >Write a comment</Typography>
                    <TextField 
                    fullWidth
                    rows={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ margintop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleComment} >
                        Comment
                    </Button>
                </div>
                )}
            </div>
        </div>

    );
};

export default CommentSection;