import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/context/ThemeContext';
import HomePage      from './pages/HomePage';
import Dashboard     from './pages/Dashboard';
import AlunniPage    from './pages/AlunniPage';
import StudentDetail from './components/alunno/StudentDetail';
import MateriaPage   from './pages/MateriaPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                    element={<HomePage />} />
          <Route path="/dashboard"           element={<Dashboard />} />
          <Route path="/alunni"              element={<AlunniPage />} />
          <Route path="/alunni/:matricola"   element={<StudentDetail />} />
          <Route path="/materie"             element={<MateriaPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
