import { BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProductsPage from './pages/ProductsPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/Navbar'
import ProductDetail from './pages/ProductDetail'
import ReportePage from './pages/ReportePage'
import ReporteDetail from './pages/ReporteDetails'
import LogoutPage from './pages/LogoutPage'
 
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={ <ProtectedRoute>  <ProductsPage /> </ProtectedRoute> }/>
          <Route path='/login' element={ <LoginPage />}/>
          <Route path='/register' element={ <RegisterPage />}/>
          <Route path='/products' element={ <ProtectedRoute>  <ProductsPage /> </ProtectedRoute>} />
          <Route path='/products/:id' element={ <ProtectedRoute> <ProductDetail /> </ProtectedRoute>} />
          <Route path='/profile/:id' element={ <ProtectedRoute>  <ProfilePage /> </ProtectedRoute>} />
          <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
          <Route path="/reporte" element={ <ProtectedRoute> <ReportePage /> </ProtectedRoute> } />
          <Route path="/reporte/:id" element={ <ProtectedRoute> <ReporteDetail /> </ProtectedRoute> } />
          <Route path="/logout" element={ <ProtectedRoute> <LogoutPage /> </ProtectedRoute> } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  )
}

export default App
