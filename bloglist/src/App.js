import React, {useState, useEffect} from 'react'

import LogIn from './components/LogIn'
import Notification from './components/Notification'
import Profile from './components/Profile'
import NewBlog from './components/NewBlog'

import userService from './services/users'
import blogService from './services/blogs'


function App() {
    const [notification, setNotification] = useState(null)
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const id = window.localStorage.getItem('id')
        const token = window.localStorage.getItem('token')

        if (id && token) {
            setSession(id, token)
        }
    }, [])


    const info = (info) => {
        setNotification({text: info, type: 'info'})
        setTimeout(() => {setNotification(null)}, 5000)
    }

    const error = (error) => {
        setNotification({text: error, type: 'error'})
        setTimeout(() => {setNotification(null)}, 5000)
    }

    const display = {info, error}
    const state = {user, setUser, blogs, setBlogs}

    const setSession = async (id, token) => {
        let newUser = await userService.getById(id)
        newUser.token = token

        setUser(newUser)

        window.localStorage.setItem('id', id)
        window.localStorage.setItem('token', token)

        const newBlogs = await blogService.getAll()

        setBlogs(newBlogs)
    }

    const endSession = async () => {
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('token')

        setUser(null)
        info('Successfully logged out')
    }

    if (!user) {
        return (
            <div>
                <h1>Bloglist</h1>
                <Notification message={notification}/>
                <LogIn state={state} display={display} setSession={setSession}/>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Bloglist</h1>
                <Notification message={notification}/>
                <Profile state={state} display={display} endSession={endSession}/>
                <NewBlog state={state} display={display}/>
            </div>
        )
    }
}

export default App
