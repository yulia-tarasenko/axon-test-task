import React from 'react';
import {deletePost} from './../api';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const deleteModal = (props) => {
    const submitDelete = () => {
        props.clicked(props.id);
        deletePost(props.id);
        props.handleClose();
    };

    return (
        <Modal open={props.open} onClose={props.handleClose}>
            <Paper variant="outlined"
            style={{
                padding: '20px', 
                maxWidth: '500px', 
                position: 'absolute', 
                top: '50%', 
                left: '50%',
                transform: 'translate(-50%, -50%)'
                }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Are you sure you want to delete this post?
                    </Typography>
                    <Button variant="contained" color="secondary"
                    style={{margin: '10px'}} onClick={submitDelete}>
                        Delete post
                    </Button>
                    <Button style={{margin: '10px'}}
                    variant="contained" onClick={props.handleClose}>Cancel</Button>
            </Paper>
        </Modal>
    );
}

export default deleteModal;