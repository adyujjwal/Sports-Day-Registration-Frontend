import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    async function handleSubmit() {
        const res = await authContext.login(username)
        if (res) {
            const id = res?.data?.id
            navigate(`/events/user/${id}`)
        } else {
            setShowErrorMessage(true)
        }
    }

    const openSignUpScreen = () => {
        navigate(`/newuser`);
    }

    return (
        <div className="Login" style={{ marginTop: "5%" }}>
            <h1 className='heading'>Sports Day Login</h1>
            {showErrorMessage && <div className="errorMessage">Authentication Failed.
                Please check your credentials.</div>}
            <div className="LoginForm" style={{ padding: '2%' }}>
                <div>
                    <TextField label="Username" color="secondary" onChange={handleUsernameChange} value={username} focused />
                </div>
                <div style={{ padding: '2%' }}>
                    <Button variant="contained" color="success" onClick={handleSubmit}> Sign in</Button>
                </div>
                <div>
                    <Button color="secondary" onClick={openSignUpScreen}>New User? Sign Up</Button>
                </div>
            </div>
        </div>
    )
}
export default LoginComponent