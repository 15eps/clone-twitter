import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Context = createContext()

function AuthProvider({ children }) {
    const navigate = useNavigate()
    const [message, setMessage] = useState()
    const data = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(() => {
        if (data) {
            api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
            return data
        }
        return null
    })

    const handlelogin = async (email, password) => {
        try {
            const { data } = await api.get('/login', {
                auth: {
                    username: email,
                    password: password
                }
            });

            localStorage.setItem('user', JSON.stringify(data))
            api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
            setUser(data)
            navigate('/')

        } catch (error) {
            return error
        }
    }

    const handlelogout = () => {
        localStorage.clear()
        api.defaults.headers.Authorization = ''
        setUser(null)
        navigate('/login')
    }

    const updateData = async (data) => {
        localStorage.setItem('user', JSON.stringify({accessToken: user.accessToken, ...data}))
        setUser((prevState) => ({ accessToken: prevState.accessToken, ...data }))
        navigate('/')
    }


    const value = { user, handlelogin, handlelogout, updateData,message }


    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

const useAuthContext = () => useContext(Context)

export { AuthProvider, useAuthContext }