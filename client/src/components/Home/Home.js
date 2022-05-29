import React, {useState, useEffect } from "react";
import {Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import Pagination  from "../Pagination";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Home = () => { 
    const classes = useStyles();
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);


    useEffect(() => {
    dispatch(getPosts()); 
    }, [currentId, dispatch]);

    // searchPost function to button //
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    };

    // function for ENTER key pressed // 
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {    // keyCode 13 means the user pressed the key ENTER//
            searchPost();
        }
    };

    // function that allows to add tags //
    const handleAdd = (tag) => setTags([...tags, tag]);

    // function that allows to delete tags//
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in> 
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}> 
                    <Posts setCurrentId={setCurrentId}/> 
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField 
                    name="search" 
                    variant="outlined" 
                    label="Search Memories"
                    onKeyPress={handleKeyPress}
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <ChipInput 
                    styles={{margin: '10px 0 '}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined"
                    />
                </AppBar>
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">
                    Search
                </Button>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <Paper className={classes.pagination} elevation={6}>
                        <Pagination page={page} />
                    </Paper>
                </Grid>
            </Grid>
        </Container> 
    </Grow>
    );
};

export default Home;
