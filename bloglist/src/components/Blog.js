import React from 'react'
import PropTypes from 'prop-types'

import Toggleble from './Togglable'

const Blog = (props) => {
    const blog = props.blog


    return (
        <div className="blog">
            <p>title: {blog.title}</p>
            <p>author: {blog.author} </p>
            <Toggleble show="view" hide="hide">
                <p>url: {blog.url} </p>
                <p>likes: {blog.likes}
                    <button onClick={() => props.like(blog)}>
                    Like
                    </button>
                </p>
                <p>owner id: {blog.user} </p>
                <p>blog id: {blog.id} </p>
                <button onClick={() => props.remove(blog)}>
                    Remove
                </button>
            </Toggleble>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
}

export default Blog