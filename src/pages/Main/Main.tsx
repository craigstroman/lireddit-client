import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
