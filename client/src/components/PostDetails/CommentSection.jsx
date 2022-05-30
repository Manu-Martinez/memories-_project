import React from "react";
import { useState, useRef } from "react";
import { Typography, Textfield, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from "./styles";


const CommentSection = ({ post }) => {
    console.log(post);
    const classes = useStyles();
    cosnt [comments, setComments] = useState([1, 2, 3, 4]);

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
            </div>
        </div>

    );
};

export default CommentSection;