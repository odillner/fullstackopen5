import React, {useState} from 'react'
import blogService from '../services/blogs'

/*snow ball creation page*/
const NewBlog = (props) => {
    const [titleInput, setTitleInput] = useState('')
    const [authorInput, setAuthorInput] = useState('')
    const [urlInput, setUrlInput] = useState('')

    const user = props.user
    const display = props.display

    const createBlog = async (event) => {
        event.preventDefault()

        const newBlog = {
            title: titleInput,
            author: authorInput,
            url: urlInput,
            user: user.id
        }

        try {
            await blogService.create(newBlog, user.token)
            display.info('Blog successfully created')
        } catch (err) {
            display.error('Error creating blog')
        }

        setTitleInput('')
        setAuthorInput('')
        setUrlInput('')
    }
    
    const handleTitleForm = (event) => {
        setTitleInput(event.target.value)
    }

    const handleAuthorForm = (event) => {
        setAuthorInput(event.target.value)
    }

    const handleUrlForm = (event) => {
        setUrlInput(event.target.value)
    }

    if (user) {
        return (
            <div className="wrapper">
                <h1>create new blog</h1>
                <form>
                    <div>
                        title: <input value={titleInput} onChange={handleTitleForm}/>
                    </div>
                    <div>
                        author: <input value={authorInput} onChange={handleAuthorForm}/>
                    </div>
                    <div>
                        url: <input value={urlInput} onChange={handleUrlForm}/>
                    </div>
                    <div>
                        <button type="submit" onClick={createBlog}>Create Blog</button>
                    </div>
                </form>
        </div>
        )
    }

    return (
        <div>
            log in to create blog
        </div>
    )
}

export default NewBlog
