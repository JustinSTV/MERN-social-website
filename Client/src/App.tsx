import { Route, Routes, Navigate } from 'react-router-dom'
import { useUserContext } from './context/User/useUserContext'

import LoginPage from './components/pages/auth/LoginPage'
import RegisterPage from './components/pages/auth/RegisterPage'
import MainOutlet from './components/template/MainOutlet'
import NewsFeed from './components/pages/feed/NewsFeed'
import ProtectedRoute from './components/pages/auth/ProtectedRoute'

const App = () => {

  const { state } = useUserContext();

  return (
    <Routes>
      <Route path='/login' element={
        state.isAuthenticated  
          ? <Navigate to='/feed' replace />
          : <LoginPage />
      } />
      <Route path='/register' element={
        state.isAuthenticated  
          ? <Navigate to='/feed' replace />
          : <RegisterPage />
      } />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainOutlet />}>
          <Route path='/' element={<Navigate to="/feed" replace />} />
          <Route path='/feed' element={<NewsFeed />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to='/' replace/>} />
    </Routes>
  )
}

export default App
