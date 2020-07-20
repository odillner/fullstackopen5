import React from 'react'

import Blogs from './Blogs'

const Profile = (props) => {
    const user = props.user

    if (user) {
        return (
            <div className='profile'>
                <button onClick={props.logOut}>
                    Log Out
                </button>
                <h1>profile</h1>
                <p>username: {user.username} </p>
                <p>id: {user.id} </p>
                <Blogs blogs={user.blogs}/>
            </div>
        )
    }

    return (
        <div/>
    )
}

export default Profile