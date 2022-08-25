import React, {useState} from 'react'
import './styles/App.css'
import PostList from "./components/PostList";
import CustomButton from "./components/UI/button/CustomButton";
import CustomInput from "./components/UI/input/CustomInput";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript 1', body: 'Description'},
        {id: 2, title: 'Javascript 2', body: 'Description'},
        {id: 3, title: 'Javascript 3', body: 'Description'},
        {id: 4, title: 'Javascript 4', body: 'Description'},
        {id: 5, title: 'Javascript 5', body: 'Description'}
    ])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            id: Date.now(),
            title,
            body
        }
        setPosts([...posts, newPost])
        setTitle('')
        setBody('')
        console.log(newPost)
    }

    return (
        <div className="App">
            <form>
                <CustomInput
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Post title"
                />
                <CustomInput
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    type="text"
                    placeholder="Post description"
                />
                <CustomButton onClick={addNewPost}>Create post</CustomButton>
            </form>
            <PostList posts={posts} title="Post list"/>
        </div>
    );
}

export default App;
