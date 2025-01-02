import { Route, Routes } from 'react-router-dom'

import LoginPage from './components/pages/auth/LoginPage'
import RegisterPage from './components/pages/auth/RegisterPage'
import MainOutlet from './components/template/MainOutlet'
import NewsFeed from './components/pages/feed/NewsFeed'
import ProtectedRoute from './ProtectedRoute'

const App = () => {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<MainOutlet />}>
        <Route path='/feed' element={
          <ProtectedRoute>
            <NewsFeed />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
