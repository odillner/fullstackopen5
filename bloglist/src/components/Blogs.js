import React from 'react'

const Blog = (props) => {
    const blog = props.blog

    if (blog) {
        return (
            <div className='blog'>
                <b>blog </b>
                <p>title: {blog.title} </p>
                <p>author: {blog.author} </p>
                <p>url: {blog.url} </p>
                <p>likes: {blog.likes} </p>
                <p>owner id: {blog.user} </p>
                <p>blog id: {blog.id} </p>
            </div>
        )
    } 

    return (
        <div/>
    )
}

const Blogs = (props) => {
    const blogs = props.blogs

    if ((blogs != []) && blogs) {
        if (blogs[0]) {
            if (blogs[0].id) {
                return (
                    <div className="wrapper">
                        <h2>{props.title}</h2>
                        {blogs.map(blog => {
                            return <Blog blog={blog} key={blog.id}/>
                        })}
                    </div>
                )
            }
        }
    }

    return (
        <div/>
    ) 
}


export default Blogs