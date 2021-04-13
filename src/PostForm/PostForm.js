import React from 'react';
import { useForm } from "react-hook-form";
import {addPost, changePost} from './../api';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const postForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { ref: titleRef, ...titleRest } = register('title', {required: true, maxLength: 100});
    const { ref: bodyRef, ...bodyRest } = register('body', {required: true, maxLength: 1000});

    const formSubmitPost = (data) => {
        const submitMethod = props.isNewPost ? addPost : changePost;
        const actionMethod = props.isNewPost ? props.clickedCreate : props.clickedEdit;
        submitMethod({
            title: data.title,
            body: data.body, 
            userId: 1
        }, props.id);
        actionMethod(data.title, data.body, props.id);
        props.handleClose();
        reset();
    };

    return (
        <Modal open={props.open} onClose={() => {
            props.handleClose();
            reset();
        }}>
            <Paper variant="outlined"
            style={{
                padding: '20px', 
                maxWidth: '500px', 
                position: 'absolute', 
                top: '50%', 
                left: '50%',
                transform: 'translate(-50%, -50%)'
                }}>
                <form onSubmit={handleSubmit(formSubmitPost)}>
                    <TextField label="Title" margin="normal"
                    fullWidth {...titleRest} inputRef={titleRef}
                    defaultValue={props.titleValue ? props.titleValue : ''} 
                    error={!!errors.title}
                    helperText={errors.title ? 
                    (errors.title.type === "required" ? "This is required" :
                    (errors.title.type === "maxLength" ? "Can't be greater than 100 symbols" : null))
                    : null}/>

                    <TextField label="Body" margin="normal" multiline
                    fullWidth {...bodyRest} inputRef={bodyRef}
                    defaultValue={props.bodyValue ? props.bodyValue : ''}
                    error={!!errors.body}
                    helperText={errors.body ? 
                    (errors.body.type === "required" ? "This is required" :
                    (errors.body.type === "maxLength" ? "Can't be greater than 1000 symbols" : null))
                    : null}/>

                    <Button type="submit" variant="outlined" color="primary"
                    style={{margin: '10px'}}>
                        {props.isNewPost ? 'Post' : 'Edit'}
                    </Button>
                    <Button style={{margin: '10px'}} variant="outlined" onClick={() => {
                    props.handleClose();
                    reset();
                    }}>
                    Cancel
                    </Button>
                </form>
            </Paper>
        </Modal>
    );
}

export default postForm;