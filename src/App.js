import React, {useMemo, useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import CustomSelect from "./components/UI/select/CustomSelect";
import CustomInput from "./components/UI/input/CustomInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'cJavascript 1', body: 'Description 5'},
        {id: 2, title: 'aJavascript 2', body: 'Description 4'},
        {id: 3, title: 'bJavascript 3', body: 'Description 3'},
        {id: 4, title: 'Javascript 5', body: 'Description 1'},
        {id: 5, title: 'Javascript 4', body: 'Description 2'}
    ])
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const sortedPosts = useMemo(() => {
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts

    }, [selectedSort, posts])
    
    const sortedAndSearchedPosts =  useMemo(() => {
        return sortedPosts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <div>
                <CustomInput
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search"
                />
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
