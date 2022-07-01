import { Routes, Route, Navigate } from 'react-router-dom'

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { SignUp } from './pages/Signup'
import {User} from './pages/User'

import { useAuthContext } from './Context/authcontext'
import { Menu } from './components/Menu'

const PrivateRoutes = ({ children }) => {

    const { user,handlelogout,message } = useAuthContext()
    return (user ? (
        <div className="flex h-full">
        <Menu username={user.username} avatar={user.avatar} logout={handlelogout}/>
        <div className="flex-1 overflow-y-auto">
           {message &&( <div>{message}</div>)}
            {children}
        </div>
    </div>) : 
        <Navigate to="/login" />
    )
}

export default function RouteSetup() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>} />
                <Route path="/:userid" element={<PrivateRoutes><User /></PrivateRoutes>} />
                <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </>
    )

}