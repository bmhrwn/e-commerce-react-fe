import logo from './logo.svg';
import './App.css';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return(
    <Routes>
      <Route path='/admin/dashboard' element={<DashboardAdminPage />} />
    </Routes>
  )
}
export default App;
