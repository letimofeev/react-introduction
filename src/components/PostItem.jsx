import React from 'react';
import CustomButton from "./UI/button/CustomButton";
import {useHistory} from "react-router-dom";

const PostItem = (props) => {
    const router = useHistory()

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__buttons">
                <CustomButton onClick={() => router.push(`/posts/${props.post.id}`)}>
                    Open
                </CustomButton>
                <CustomButton onClick={() => props.remove(props.post)}>Delete</CustomButton>
            </div>
        </div>
    );
};

export default PostItem;