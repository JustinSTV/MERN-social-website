import { Route, Routes, Navigate } from 'react-router-dom'

import LoginPage from './components/pages/auth/LoginPage'
import RegisterPage from './components/pages/auth/RegisterPage'
import MainOutlet from './components/template/MainOutlet'
import NewsFeed from './components/pages/feed/NewsFeed'
import ProtectedRoute from './components/pages/auth/ProtectedRoute'

const App = () => {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainOutlet />}>
          <Route path='/' element={<Navigate to="/feed" replace />} />
          <Route path='/feed' element={<NewsFeed />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
