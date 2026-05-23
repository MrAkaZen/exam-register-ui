import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage    from './pages/HomePage';
import AlunniPage  from './pages/AlunniPage';
import MateriaPage from './pages/MateriaPage';
import Dashboard    from './pages/Dashboard';
import AlunnoDetail from './pages/AlunnoDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alunni"  element={<AlunniPage />} />
        <Route path="/alunni/alunno" element={<AlunnoDetail />} />        
        <Route path="/materie" element={<MateriaPage />} />
      </Routes>
    </BrowserRouter>
  );
}