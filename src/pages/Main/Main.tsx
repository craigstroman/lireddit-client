import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
