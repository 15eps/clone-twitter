import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function useAuth(){
    const [user, setUser] = useState(()=>{
        const data = JSON.parse(localStorage.getItem('user'))       
        
        if(data){
            api.defaults.headers.Authorization = `Bearer ${data.accessToken}`

            return data
        }
        return null
    })

    const navigate = useNavigate()
    async function handlelogin(email, password){
        try{
            const {data} = await api.get('/login',{
                auth: {
                    username: email,
                    password: password
                }
            });
            
            localStorage.setItem('user',JSON.stringify(data))
            api.defaults.headers.Authorization = `Bearer ${data.accessToken}`
            setUser(data)
            navigate('/')
    
        }catch(error){
            return error
        }
    }
    function afterSingup(data){
        localStorage.setItem('user',JSON.stringify(data))
        api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        setUser(data)
        navigate('/')
    }

    function handlelogout(){
       localStorage.clear() 
       api.defaults.headers.Authorization = ''
       setUser(null)
       navigate('/login')
    }

    return {handlelogin, handlelogout,afterSingup,user }
}