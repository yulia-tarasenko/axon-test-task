import React, {useState, useEffect} from 'react';
import './App.css';
import Posts from './Posts/Posts';
import PostForm from './PostForm/PostForm';
import DeleteModal from './DeleteModal/DeleteModal';
import Carousel from './Carousel/Carousel';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [newId, setNewId] = useState(101);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
        return response.json();
    }).then(json => {
      setPosts(json.slice(0, 6));
      setLoading(false);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => {
      setOpen(false);
      setTitleForm('');
      setBodyForm('');
      setFormType(true);
  };

  const [isNewPost, setFormType] = useState(true);
  const [currentId, setId] = useState(0);

  const [titleForm, setTitleForm] = useState('');
  const [bodyForm, setBodyForm] = useState('');

  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const clickedEditHandler = (title, body, id) => {
    setFormType(false);
    setTitleForm(title);
    setBodyForm(body);
    setId(id);
    handleOpen();
  };

  const clickedDeleteHandler = (id) => {
    setId(id);
    handleDeleteOpen();
  };

  const createPostHandler = (title, body) => {
    let newPosts = posts.map(post => ({...post}));
    newPosts.push({id: newId, title, body});
    console.log(newPosts);
    setPosts(newPosts);
    setNewId(newId+1);
  };

  const editPostHandler = (title, body, id) => {
    let newPosts = posts.map(post => ({...post}));
    let editIndex = newPosts.findIndex(elem => elem.id === id);
    newPosts[editIndex] = {id, title, body};
    console.log(newPosts);
    setPosts(newPosts);
  };

  const deletePostHandler = (id) => {
    let newPosts = posts.map(post => ({...post}));
    let deleteIndex = newPosts.findIndex(elem => elem.id === id);
    newPosts.splice(deleteIndex, 1);
    setPosts(newPosts);
  };

  
  if (isLoading) {
    return <CircularProgress/>
  }

  return (
    <div className="App">
      <Container maxWidth="lg" style={{marginBottom: '20px'}}>
        <Button variant="outlined"
            color="primary"
            onClick={handleOpen}
            style={{marginBlockEnd: '20px'}}>
                Create new post
        </Button>
        <PostForm open={open} handleClose={handleClose}
        isNewPost={isNewPost} id={currentId}
        titleValue={titleForm} bodyValue={bodyForm}
        clickedCreate={createPostHandler} clickedEdit={editPostHandler}/>
        <DeleteModal open={openDelete} handleClose={handleDeleteClose}
        id={currentId} clicked={deletePostHandler}/>
        <Posts posts={posts} 
        clickedEdit={clickedEditHandler} clickedDelete={clickedDeleteHandler}/>
      </Container>
      <Carousel items={posts}/>
    </div>
  );
}

export default App;
