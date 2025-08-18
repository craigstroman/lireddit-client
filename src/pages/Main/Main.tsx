import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Index } from '../Index/Index';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Dashboard } from '../Dashboard/Dashboard';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import './Main.scss';

// TODO: Figure out how to get route with a parameter working, right now nesting the route doesn't work

export const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/change-password">
          <Route path=":token" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
