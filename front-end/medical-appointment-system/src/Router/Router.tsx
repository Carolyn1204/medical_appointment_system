import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import PatientProfilePage from '../Pages/PatientProfilePage/PatientProfilePage';
import PatientProfileUpdatePage from '../Pages/PatientProfileUpdatePage/PatientProfileUpdatePage';
import PatientAppointmentPage from '../Pages/PatientAppointmentPage/PatientAppointmentPage';
import DoctorAppointmentPage from '../Pages/DoctorAppointmentPage/DoctorAppointmentPage';
import DoctorSchedulePage from '../Pages/DoctorSchedulePage/DoctorSchedulePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/patient/profile',
    element: <PatientProfilePage />
  },
  {
    path: '/patient/profile_update',
    element: <PatientProfileUpdatePage />
  },
  {
    path: '/patient/app',
    element: <PatientAppointmentPage />
  },
  {
    path: '/doctor/appointment',
    element: <DoctorAppointmentPage />
  },
  {
    path: '/doctor/schedule',
    element: <DoctorSchedulePage />
  }
];

const router = createBrowserRouter(routes);

export default router;
