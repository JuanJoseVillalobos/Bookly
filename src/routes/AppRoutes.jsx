import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import ExperienceDetails from '../pages/ExperienceDetails';
import Booking from '../pages/Booking';
import Confirmation from '../pages/Confirmation';
import NotFound from '../pages/NotFound';

/**
 * AppRoutes
 * Centralized route definitions for Bookly.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/experience/:id" element={<ExperienceDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

