import React, {useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import CustomModal from "./components/UI/modal/CustomModal";
import CustomButton from "./components/UI/button/CustomButton";
import {usePosts} from "./hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'cJavascript 1', body: 'Description 5'},
        {id: 2, title: 'aJavascript 2', body: 'Description 4'},
        {id: 3, title: 'bJavascript 3', body: 'Description 3'},
        {id: 4, title: 'Javascript 5', body: 'Description 1'},
        {id: 5, title: 'Javascript 4', body: 'Description 2'}
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <CustomButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Create post
            </CustomButton>
            <CustomModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </CustomModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list"/>
        </div>
    );
}

export default App;
