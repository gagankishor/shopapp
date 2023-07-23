import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/login';
import Edit from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
import Create from './pages/CreateBlog';
const token = localStorage.getItem('token');
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route exact index element={<Dashboard />} />
      <Route exact path="/editblog/:id" element={token ? <Edit /> : <Login />} />
      <Route exact path="/viewblog/:id" element={<ViewBlog />} />
      <Route exact path="profile" element={token ?<Profile /> : <Login />} />
      <Route exact path="create" element={token ?<Create /> : <Login />} />
      <Route exact path="login" element={<Login />} />
    </Route>
  )
)
function App() {
  return (<>
    <RouterProvider router={router} /></>
  );
}
export default App;
