import React from 'react'

import Toggleble from './Togglable'
import blogService from '../services/blogs'

const Blog = (props) => {
    const blog = props.blog

    if (blog) {
        return (
            <div>
                <p>author: {blog.author} </p>
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
            </div>
        )
    }

    return (
        <div/>
    )
}

const Blogs = (props) => {
    const {user, setUser} = props.state
    const {info, error} = props.display

    const blogs = user.blogs.sort((a,b) => a['title'].localeCompare(b['title']))

    const likeBlog = async (blog) => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            user: blog.user,
            likes: blog.likes + 1
        }

        try {
            await blogService.update(blog.id, newBlog, user.token)

            blog.likes++

            user.blogs = blogs
            setUser(user)

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

            user.blogs = user.blogs.filter(blog => blog.id != removedBlog.id)
            setUser(user)

            info('Blog successfully deleted')
        } catch (err) {
            console.log(err)
            error('Error deleting blog')
        }
    }

    if (blogs[0]) {
        return (
            <div className="wrapper">
                {blogs.map(blog => {
                    return (
                        <div className='blog' key={blog.id}>
                            <p>{blog.title}</p><Toggleble show="view" hide="hide">
                                <Blog blog={blog} like={likeBlog} remove={removeBlog}/>
                            </Toggleble>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div/>
    )
}


export default Blogs