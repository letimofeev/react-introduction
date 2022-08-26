import React, {useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import CustomSelect from "./components/UI/select/CustomSelect";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'cJavascript 1', body: 'Description 5'},
        {id: 2, title: 'aJavascript 2', body: 'Description 4'},
        {id: 3, title: 'bJavascript 3', body: 'Description 3'},
        {id: 4, title: 'Javascript 5', body: 'Description 1'},
        {id: 5, title: 'Javascript 4', body: 'Description 2'}
    ])
    const [selectedSort, setSelectedSort] = useState('')

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px'}}/>
            <div>
                <CustomSelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Sorting by"
                    options={[
                        {value: 'title', name: 'By title'},
                        {value: 'body', name: 'By description'}
                    ]}
                />
            </div>
            {posts.length
                ?
                <PostList remove={removePost} posts={posts} title="Post list"/>
                :
                <h1 style={{textAlign: "center"}}>Posts not found</h1>
            }
        </div>
    );
}

export default App;
