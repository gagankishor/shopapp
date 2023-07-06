import React from 'react';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'


import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
// import Create from './pages/CreateQuestion';
import Profile from './pages/Profile';
// import { createAction } from './pages/CreateQuiz';
// import Question from './pages/Question';
import CreateQuestion from './pages/CreateQuestion';
import Create from './pages/CreateQuiz';
import Login from './pages/login';
import Register from './pages/Register';
import Edit from './pages/EditBlog';
import ViewBlog from './pages/ViewBlog';
// import PushNotification from './PushNotification';
// import ProtectedRoute from './auth/ProtectedRoute';

const token = localStorage.getItem('token');
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route exact index element={<Dashboard />} />
      {/* <Route exact path="questioncreate" element={<CreateQuestion />} action={createQuestionAction} /> */}
      <Route exact path="questioncreate" element={token?<CreateQuestion/>: <Login />} />
      <Route exact path="/editblog/:id" element={token?<Edit/>: <Login />}/>
      <Route exact path="/viewblog/:id" element={<ViewBlog/>}/>
      {/* <Route exact path="/editblog/:id" element={<CreateQuestion/>}/> */}
      <Route exact path="profile" element={<Profile />} />
      <Route exact path="create" element={<Create />} />
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
    </Route>
  )
)

function App() {
  return (<>
      <RouterProvider router={router} /></>
  );
}

export default App;
