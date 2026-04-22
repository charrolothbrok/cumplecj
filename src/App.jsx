import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import InvitationPage from './pages/InvitationPage'
import AdminPage from './pages/AdminPage'
import CheckInPage from './pages/CheckInPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
