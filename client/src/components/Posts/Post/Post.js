import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);
    const hasLikedPost = likes.find((like) => like === userId);
    const userId = user?.result?.googleId || user?.result?._id;

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([...post.likes, userId]);
        }
    };

    const Likes =  () => {
        if (post?.likes?.length > 0) {
            return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (  //used this to show how many people like a post//
            <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : ( // if someone did not like it, it will say the number of likes instead //
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
        // if you are the first, it'll show Like //
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    
    const openPost = () => 
        history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openPost} >
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h6'> {post.name} </Typography>
                    <Typography variant='body2'> {moment(post.CreatedAt).fromNow()} </Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId=(post._id)} > 
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
                )}
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component="h2"> {post.tags.map((tag) => `#${tag}` )} </Typography>
                </div>
                <Typography className={classes.title} variant='h5' component="h2" gutterBottom> {post.title} </Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'> {post.message} </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions} >
                <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike} >
                    <Likes /> 
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))} >
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;