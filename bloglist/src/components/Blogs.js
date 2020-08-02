import React from 'react'
import PropTypes from 'prop-types'

import Blog from './Blog'

import blogService from '../services/blogs'


const Blogs = (props) => {
    const {user, setBlogs} = props.state
    let blogs = props.state.blogs.sort((a,b) => b.likes - a.likes)
    const {info, error} = props.display


    const likeBlog = async (blog) => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            user: blog.user,
            likes: blog.likes + 1
        }

        try {
            await blogService.update(blog.id, newBlog)

            blog.likes++

            setBlogs(blogs)

            info('Blog successfully liked')
        } catch (err) {
            error('Error liking blog')
        }
    }

    const removeBlog = async (removedBlog) => {
        if (!window.confirm(`Do you really want to delete ${removedBlog.title}?`)) {
            return
        }

        try {
            await blogService.remove(removedBlog.id, user.token)

            blogs = blogs.filter(blog => blog.id != removedBlog.id)
            setBlogs(blogs)

            info('Blog successfully deleted')
        } catch (err) {
            console.log(err)
            error('Error deleting blog')
        }
    }

    if (blogs[0]) {
        return (
            <div className="wrapper" id="blog-list">
                {blogs.map(blog => {
                    return (
                        <Blog blog={blog} user={user} like={likeBlog} remove={removeBlog} key={blog.id}/>
                    )
                })}
            </div>
        )
    }

    return (
        <div/>
    )
}

Blogs.propTypes = {
    state: PropTypes.object.isRequired,
    display: PropTypes.object.isRequired,
}

export default Blogs