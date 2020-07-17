import React, {useState} from 'react'
import logInService from '../services/login'

const LogIn = (props) => {
    const [nameInput, setNameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')

    const display = props.display

    const logInUser = async (event) => {
        event.preventDefault()

        const newUser = {
            username: nameInput,
            password: passwordInput
        }

        try {
            const res = await logInService.auth(newUser)

            props.setSession(res)
            display.info("Successfully logged in")
        } catch (err) {
            display.error("Failed to log in, password or username incorrect")
        }
        setNameInput('')
        setPasswordInput('')
    }
    
    const handleNameForm = (event) => {
        setNameInput(event.target.value)
    }
    
    const handlePasswordForm = (event) => {
        setPasswordInput(event.target.value)
    }

    return (
        <div>
            <form>
                <div>
                    name: <input value={nameInput} onChange={handleNameForm}/>
                </div>
                <div>
                    password: <input value={passwordInput} onChange={handlePasswordForm}/>
                </div>
                <div>
                    <button type="submit" onClick={logInUser}>Log In</button>
                </div>
            </form>
        </div>
    )
}

export default LogIn
