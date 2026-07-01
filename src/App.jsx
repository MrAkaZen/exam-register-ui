import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Alunni from './pages/Alunni';
import Materia from './pages/Materia';
import AlunnoDetails from './components/alunno/alunnoDetails';
import Professori from './pages/Proessori';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/alunni" element={<Alunni />} />
          <Route path="/alunni/:matricola" element={<AlunnoDetails />} />
          <Route path="/materie" element={<Materia />} />
          <Route path="/professori" element={<Professori />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}