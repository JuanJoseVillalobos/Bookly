import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/**
 * MainLayout
 * Base layout structure for Bookly pages.
 * Houses the persistent header/navigation, main content area via Outlet, and footer.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#222824]">
      <header className="border-b border-[#E8E5DC] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#173F35]">Bookly</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-[#173F35] transition-colors">Inicio</Link>
            <Link to="/explore" className="hover:text-[#173F35] transition-colors">Explorar</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer shell (will be expanded in BKL-04) */}
      <footer className="border-t border-[#E8E5DC] bg-white py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Bookly. Discover. Book. Experience.</p>
        </div>
      </footer>
    </div>
  );
}

