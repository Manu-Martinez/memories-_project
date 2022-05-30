import React from "react";
import { useState, useRef } from "react";
import { Typography, Textfield, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from "./styles";


const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState([1, 2, 3, 4]);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));


    const handleClick = () => {
        const finalComment = `${user.result.name}: ${comment}`;
        dispatch(commentPost(finalComment, post_id));
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterbottom variant="h6" >Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterbottom variant="subtitle1" >
                            Comment {i}
                        </Typography>
                    ))}
                </div>
                <div style={{ width: '70%'}}>
                    <Typography gutterBottom variant="h6" >Write a comment</Typography>
                    <Textfield 
                    fullWidth
                    rows={4}
                    variant="outlined"
                    label="Comment"
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <Button style={{ margintop: '10px'}} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick} >
                        Comment
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default CommentSection;