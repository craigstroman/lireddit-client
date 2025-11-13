import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Index } from '../Index/Index';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Dashboard } from '../Dashboard/Dashboard';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { ForgotPassword } from '../ForgotPassword/ForgotPassword';
import { CreatePost } from '../CreatePost/CreatePost';
import { Post } from '../Post/Post';
import { UpdatePost } from '../UpdatePost/UpdatePost';

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/update" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
};
