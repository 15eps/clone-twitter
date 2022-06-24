import {createContext,useContext,useMemo} from 'react'
import useAuth from '../hooks/useAuth'

const Context = createContext()

function AuthProvider({children}){
    const {handlelogin, handlelogout,afterSingup,user} = useAuth()


    const value = useMemo(()=>({handlelogin, handlelogout,afterSingup,user}),[user])
    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

const useAuthContext = () => useContext(Context)

export { AuthProvider,useAuthContext}