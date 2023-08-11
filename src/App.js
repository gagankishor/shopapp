import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import RootLayout from './layouts/RootLayout';
// import Dashboard from './pages/allProduct';
import Profile from './pages/Profile';
import Login from './pages/login';
import Edit from './pages/EditProduct';
import ViewBlog from './pages/ViewProduct';
import Create from './pages/CreateProduct';
import CreateCatagory from './pages/CreateProductCatagory';
import Register from './pages/Register';
import ProductsByCategory from './pages/ViewAllProduct';
import ProductListPage from './pages/ProductListPage';
import UpdateUserDocuments from './pages/UpdateUserDocuments';
const token = localStorage.getItem('token');
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route exact index element={<ProductListPage />} />
      <Route exact path="/editblog/:id" element={token ? <Edit /> : <Login />} />
      <Route exact path="/viewblog/:id" element={<ViewBlog />} />
      <Route exact path="profile" element={token ?<Profile /> : <Login />} />
      <Route exact path="create" element={token ?<Create /> : <Login />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="productsbycategory" element={<ProductsByCategory />} />
      <Route exact path="updateuserdocuments" element={<UpdateUserDocuments />} />
      <Route exact path="createcatagory" element={token ?<CreateCatagory /> : <Login />} />

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
