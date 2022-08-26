import React, {useMemo, useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'cJavascript 1', body: 'Description 5'},
        {id: 2, title: 'aJavascript 2', body: 'Description 4'},
        {id: 3, title: 'bJavascript 3', body: 'Description 3'},
        {id: 4, title: 'Javascript 5', body: 'Description 1'},
        {id: 5, title: 'Javascript 4', body: 'Description 2'}
    ])
    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts

    }, [filter.sort, posts])
    
    const sortedAndSearchedPosts =  useMemo(() => {
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {sortedAndSearchedPosts.length
                ?
                <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list"/>
                :
                <h1 style={{textAlign: "center"}}>Posts not found</h1>
            }
        </div>
    );
}

export default App;
