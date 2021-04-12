import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const post = (props) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={`https://picsum.photos/500/200?random=${props.id}`}
                    title="picture"
                />
                <CardContent style={{minHeight: '250px'}}>
                    <Typography gutterBottom variant="h5" component="h5" style={{color: '#00796b'}}>
                        {props.title}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {props.body}
                    </Typography>
                </CardContent>

                <Button size="small" color="primary" style={{margin: '20px'}}
                onClick={() => props.clickedEdit(props.title, props.body, props.id)}>
                    Edit post
                </Button>

                <Button size="small" color="secondary" style={{margin: '20px'}}
                onClick={() => props.clickedDelete(props.id)}>
                    Delete post
                </Button>
            </Card>
        </Grid>
    );
}

export default post;