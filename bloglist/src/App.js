import React,{useState} from 'react'

import LogIn from './components/LogIn'
import Notification from './components/Notification'

function App() {
    const [notification, setNotification] = useState(null);
    const [user, setUser] = useState(null)

    const info = (info) => {
        setNotification({text: info, type: 'info'});
        setTimeout(() => {setNotification(null)}, 5000)
    }

    const error = (error) => {
        setNotification({text: error, type: 'error'});
        setTimeout(() => {setNotification(null)}, 5000)
    }

    const display = {info, error}


    return (
        <div>
            <Notification message={notification}/>
            <LogIn display={display}/>
        </div>
    )
}

export default App
