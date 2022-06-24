import {useAuthContext} from '../Context/authcontext'

export function Logout(){
    const {handlelogout} = useAuthContext()    
            
    return handlelogout() 
   
}