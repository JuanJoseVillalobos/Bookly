import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

// Route-level code splitting for secondary views to reduce initial bundle weight
const Explore = lazy(() => import('../pages/Explore'));
const ExperienceDetails = lazy(() => import('../pages/ExperienceDetails'));
const Booking = lazy(() => import('../pages/Booking'));
const Confirmation = lazy(() => import('../pages/Confirmation'));
const NotFound = lazy(() => import('../pages/NotFound'));

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8" role="status" aria-live="polite">
      <div className="w-8 h-8 rounded-full border-2 border-stone border-t-forest animate-spin" />
    </div>
  );
}

/**
 * AppRoutes
 * Centralized route definitions for Bookly.
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
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
    </Suspense>
  );
}

