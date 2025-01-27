import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
// import OnlyAdminPrivate from './components/OnlyAdminPrivate.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Search from './pages/Search.jsx';
// Lazily load the pages
const Home = lazy(() => import('./pages/Home.jsx'));
const SignIn = lazy(() => import('./pages/SignIn.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const PostPage = lazy(() => import('./pages/PostPage.jsx'));

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Header />
      <Suspense fallback={<div className='min-h-screen'>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/community' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />}/>
          <Route path='/search' element={<Search/>}/>
          <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/create-post' element={<CreatePost />} />
          {/* <Route element={<OnlyAdminPrivate/>}></Route> */}
          <Route path='/update-post/:postId' element={<UpdatePost/>} />
          <Route path='/post/:postSlug' element={<PostPage/>} />
        </Routes>
      </Suspense>
      <FooterCom />
    </BrowserRouter>
  );
}
