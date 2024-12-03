import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { isAdmin } from 'src/services/AuthService';
import UserRoles from 'src/constants/UserRoles';
import { ProtectedRoute, AuthProtectedRoute } from './ProtectedRoute';
// import { Home } from '@mui/icons-material';
// import About from 'src/views/about/About';
// import Contact from 'src/views/contact/Contact';

/* ***Layouts**** */
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const CustomerLayout = Loadable(lazy(() => import('../layouts/full/CustomerLayout')));
const ProfileLayout = Loadable(lazy(() => import('../layouts/full/ProfileLayout')));
/* ****Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Courses = Loadable(lazy(() => import('../views/courses/Courses')));
const Decks = Loadable(lazy(() => import('../views/decks/Decks')));
const Cards = Loadable(lazy(() => import('../views/cards/Cards')));
const Profile = Loadable(lazy(() => import('../views/profile/Profile')));
const Password = Loadable(lazy(() => import('../views/profile/Password')));
const ProPlans = Loadable(lazy(() => import('../views/proPlans/ProPlans')));
const Flashcards = Loadable(lazy(() => import('../views/flashcard/Flashcards')));
const Learnings = Loadable(lazy(() => import('../views/learning/Learning')));
const ProHistories = Loadable(lazy(() => import('../views/proHistories/ProHistories')));
const Home = Loadable(lazy(() => import('../views/home/Home')));
const About = Loadable(lazy(() => import('../views/about/About')));
const Contact = Loadable(lazy(() => import('../views/contact/Contact')));
const Notification = Loadable(lazy(() => import('../views/notifications/Notifications')));
const ResetPassword = Loadable(lazy(() => import('../views/authentication/ResetPassword')));
const Tracker = Loadable(lazy(() => import('../views/tracker/Tracker')));
const Router = [
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: '/home', element: <Courses /> },
      // { path: '/about', element: <About /> },
      { path: '/courses', element: <Courses /> },
      { path: '/courses/:courseId/decks', element: <Decks /> },
      { path: '/courses/:courseId/decks/:deckId/cards', element: <Cards /> },
      // { path: '/contact', element: <Contact /> },
      { path: '/pro-plans', element: <ProPlans /> },
      // { path: '/courses/:courseId/decks', element: <Decks /> },
      // { path: '/courses/:courseId/decks/:deckId/cards', element: <Cards /> },
      // { path: '/pro-plans', element: <ProPlans /> },
      // { path: '/profile', element: <Profile /> },
      // { path: '/password', element: <Password /> },
      { path: '/notifications', element: <Notification /> },
      { path: '/tracker', element: <Tracker /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute element={<CustomerLayout />} />,
    children: [
      // { path: '/', element: <Navigate to="/home" /> },
      // { path: '/home', element: <Home /> },
      // { path: '/profile', element: <Profile /> },
      // { path: '/contact', element: <Contact /> },
      // { path: '/courses', element: <Courses /> },
      { path: '/courses/:courseId/decks/:deckId/learning', element: <Learnings /> },
      { path: '/about', element: <About /> },
      { path: '/password', element: <Password /> },
      { path: '/flashcards', element: <Flashcards /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/profile',
    element: <ProtectedRoute element={<ProfileLayout />} />,
    children: [
      { path: '/profile', element: <Profile /> },
      { path: '/profile/change-password', element: <Password /> },
      { path: '/profile/pro-histories', element: <ProHistories /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthProtectedRoute />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/reset-password', element: <ResetPassword /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
