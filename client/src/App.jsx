import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OnlyAdminPrivate from './components/OnlyAdminPrivate.jsx';
import CreatePost from './pages/CreatePost.jsx';

// Lazily load the pages
const Home = lazy(() => import('./pages/Home.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />}/>
          <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route element={<OnlyAdminPrivate/>}>
          <Route path='/create-post' element={<CreatePost />} />
          </Route>
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </Suspense>
      <FooterCom />
    </BrowserRouter>
  );
}
