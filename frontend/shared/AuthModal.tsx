"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, Mail, Lock, User, ArrowRight } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "./store/useAuth";
import { useCloudSync } from "./hooks/useCloudSync";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [persona, setPersona] = useState<"creator" | "brand" | "agency" | "user">("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { syncLocalLinks } = useCloudSync();

  const handleSuccess = async (user: any) => {
    login(user);
    // Sync local links to cloud
    await syncLocalLinks();
    onClose();
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess(data.user);
      } else {
        setError(data.error || "Google login failed");
      }
    } catch (e) {
      setError("An error occurred during Google login.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin ? { email, password } : { name, email, password, persona };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        handleSuccess(data.user);
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-[1000] overflow-hidden border border-black/5 p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f4ef] border border-[#e7e5dc] text-[10.5px] font-black uppercase tracking-wider text-zinc-600 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2c35af]" />
                <span>SnapLink Workspace</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-[#121316]">
                {isLogin ? "Sign In to Workspace" : "Create Your Workspace"}
              </h2>
              <p className="text-zinc-500 text-[13px] font-medium mt-1.5 leading-relaxed">
                {isLogin
                  ? "Access your live click analytics, edit destination URLs anytime, and manage all your smart links in one central place."
                  : "Join creators & enterprises to create instant deep links, custom domains, and view live click analytics."}
              </p>
            </div>

            {/* Google Login Button */}
            <div className="flex justify-center mb-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Sign-In was unsuccessful")}
                theme="outline"
                shape="pill"
                size="large"
                text={isLogin ? "signin_with" : "signup_with"}
                width="100%"
              />
            </div>

            <div className="relative flex items-center py-4 mb-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">
                Or continue with email
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="mb-4">
                    <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">
                      I am a...
                    </label>
                    <div className="flex gap-2 p-1 bg-[#f8f7f4] rounded-2xl border-2 border-[#e7e5dc]">
                      {[
                        { id: "user", label: "Individual" },
                        { id: "creator", label: "Creator" },
                        { id: "brand", label: "Brand" },
                        { id: "agency", label: "Agency" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPersona(tab.id as any)}
                          className={`flex-1 py-2 px-2 text-[12px] font-bold rounded-xl transition-all duration-200 ${
                            persona === tab.id
                              ? "bg-white text-[#2c35af] shadow-sm border border-black/5"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                      Full Name / Brand Name
                    </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-[#2c35af] transition-colors duration-300" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f8f7f4] border-2 border-[#e7e5dc] rounded-2xl pl-11 pr-4 py-3.5 text-[15px] font-bold text-[#121316] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#2c35af] focus:ring-4 focus:ring-[#2c35af]/10 transition-all duration-300"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>
              </>
              )}

              <div>
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-[#2c35af] transition-colors duration-300" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8f7f4] border-2 border-[#e7e5dc] rounded-2xl pl-11 pr-4 py-3.5 text-[15px] font-bold text-[#121316] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#2c35af] focus:ring-4 focus:ring-[#2c35af]/10 transition-all duration-300"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 ml-1 mr-1">
                  <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest">
                    Password
                  </label>
                  {isLogin && (
                    <a href="#" className="text-[11px] font-bold text-[#2c35af] hover:underline">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400 group-focus-within:text-[#2c35af] transition-colors duration-300" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f8f7f4] border-2 border-[#e7e5dc] rounded-2xl pl-11 pr-4 py-3.5 text-[15px] font-bold text-[#121316] placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#2c35af] focus:ring-4 focus:ring-[#2c35af]/10 transition-all duration-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-600 text-[13px] font-bold border border-red-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#121316] hover:bg-[#2c35af] text-white py-4 rounded-2xl text-[15px] font-black tracking-wide flex items-center justify-center gap-2 mt-8 transition-colors duration-300 shadow-md shadow-black/10 disabled:opacity-70"
              >
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-[13px] font-bold text-gray-500 hover:text-[#121316] transition-colors"
              >
                {isLogin ? (
                  <>Don't have an account? <span className="text-[#2c35af] underline decoration-2 underline-offset-4">Sign up</span></>
                ) : (
                  <>Already have an account? <span className="text-[#2c35af] underline decoration-2 underline-offset-4">Log in</span></>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
