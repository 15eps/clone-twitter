import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Login } from './pages/Login'
import { SignUp } from './pages/Signup'
import { Logout } from './pages/Logout'
import {User} from './pages/User'

import { useAuthContext } from './Context/authcontext'
import { Menu } from './components/Menu'

const PrivateRoutes = ({ children }) => {
    const { user } = useAuthContext()
    return (!user ? (<Navigate to="/login" />) : (
        <div className="flex h-full">
            <Menu username={user.username} avatar={user.avatar} />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    ))
}

export default function RouteSetup() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>} />
                <Route path="/:userid" element={<PrivateRoutes><User /></PrivateRoutes>} />
                <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </>
    )

}