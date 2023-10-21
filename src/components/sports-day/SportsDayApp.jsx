import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import HeaderComponent from './HeaderComponent'
import ErrorComponent from './ErrorComponent'
import LoginComponent from './LoginComponent'
import NewUserComponent from './NewUserComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import './SportsDayApp.css'
import EventRegistrationComponent from './EventRegistrationComponent'

function AuthenticatedRoute({ children }) {
    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function SportsDayApp() {
    return (
        <div className="SportsDayApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/newuser' element={<NewUserComponent />} />

                        <Route path='/events/user/:id' element={
                            <AuthenticatedRoute>
                                <EventRegistrationComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={<ErrorComponent />} />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}
