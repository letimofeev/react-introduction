import React, {useEffect, useRef, useState} from "react"
import "../styles/App.css"
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import CustomModal from "../components/UI/modal/CustomModal";
import CustomButton from "../components/UI/button/CustomButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import CustomSelect from "../components/UI/select/CustomSelect";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPageCount, setPageTotalCount] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setPageTotalCount(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPageCount, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className='App'>
            <CustomButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Create post
            </CustomButton>
            <CustomModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </CustomModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Error has occurred</h1>
            }
            <CustomSelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Page elements count"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'}
                ]}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list"/>
            <div ref={lastElement} style={{height: '20px', background: 'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/>
                </div>
            }
            <Pagination
                totalPageCount={totalPageCount}
                page={page}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
