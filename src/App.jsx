import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/authcontext'
import CustomRoutes from './routes'

export const App = () => {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}