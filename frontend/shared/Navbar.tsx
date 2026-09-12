"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { useAuth } from "./store/useAuth";
import { AuthModal } from "./AuthModal";
import { NavbarBrand } from "./parts/NavbarBrand";
import { NavbarLinks } from "./parts/NavbarLinks";
import { NavbarActions } from "./parts/NavbarActions";
import { NavbarMobileDrawer } from "./parts/NavbarMobileDrawer";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isLoading, isAuthModalOpen, openAuthModal, closeAuthModal, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-[#f5f4ef]/80 border-b border-[#e7e5dc]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] transition-all">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-[#e7e5dc] text-zinc-700 hover:text-black cursor-pointer shadow-2xs shrink-0"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
            <NavbarBrand />
          </div>

          <NavbarLinks />

          <NavbarActions
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            user={user}
            onOpenAuth={openAuthModal}
            onLogout={logout}
          />
        </div>

        {/* Mobile Drawer */}
        <NavbarMobileDrawer
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          isAuthenticated={isAuthenticated}
          onOpenAuth={openAuthModal}
        />
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}
