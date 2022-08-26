import React from 'react';
import CustomInput from "./UI/input/CustomInput";
import CustomSelect from "./UI/select/CustomSelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <CustomInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Search"
            />
            <CustomSelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Sorting by"
                options={[
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By description'}
                ]}
            />
        </div>
    );
};

export default PostFilter;