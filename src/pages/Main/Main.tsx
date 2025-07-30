import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';

export const Main: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
