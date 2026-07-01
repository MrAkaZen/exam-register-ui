import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/DashboardPage';
import AlunniPage from './pages/AlunniPage';
import MateriaPage from './pages/MateriaPage';
import AlunnoDetails from './components/alunno/alunnoDetails';
import ProfessoriPage from './pages/ProessoriPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alunni" element={<AlunniPage />} />
          <Route path="/alunni/:matricola" element={<AlunnoDetails />} />
          <Route path="/materie" element={<MateriaPage />} />
          <Route path="/professori" element={<ProfessoriPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}