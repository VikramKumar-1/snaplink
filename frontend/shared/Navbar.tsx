"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "./store/useAuth";
import { AuthModal } from "./AuthModal";
import { NavbarBrand } from "./parts/NavbarBrand";
import { NavbarLinks } from "./parts/NavbarLinks";
import { NavbarActions } from "./parts/NavbarActions";

export const Navbar: React.FC = memo(() => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleOpenAuth = useCallback(() => setIsAuthModalOpen(true), []);
  const handleCloseAuth = useCallback(() => setIsAuthModalOpen(false), []);

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-[#f5f4ef]/80 border-b border-[#e7e5dc]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-6">
        <NavbarBrand />
        <NavbarLinks />
        <NavbarActions
          isAuthenticated={isAuthenticated}
          isLoading={isLoading}
          user={user}
          onOpenAuth={handleOpenAuth}
          onLogout={logout}
        />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuth} />
    </header>
  );
});

Navbar.displayName = "Navbar";
