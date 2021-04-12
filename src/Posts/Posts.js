import React from 'react';
import Grid from '@material-ui/core/Grid';
import Post from './Post/Post';

const posts = (props) => {
    let postList = null;
    if (props.posts) {
        postList = props.posts.map(({ id, title, body }) => (
            <Post key={id}
            id={id}
            title={title}
            body={body}
            clickedEdit={props.clickedEdit}
            clickedDelete={props.clickedDelete}/>
        ));
    }

    return (
    <Grid container spacing={4}>
        {postList}
    </Grid>
    );
}

export default posts;