import React, { useState } from 'react';
import { Shield, Lock, Mail, AlertCircle, CheckCircle2, ArrowRight, X, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login, resetPassword } = useAuth();

  const [email, setEmail] = useState('admin@jayashreeagro.com');
  const [password, setPassword] = useState('Agro@Parbhani2026');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setErrorMessage(result.error || 'Authentication failed.');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMsg('');
    const res = await resetPassword(email);
    setResetMsg(res.message);
  };

  const fillDemoAdmin = () => {
    setEmail('admin@jayashreeagro.com');
    setPassword('Agro@Parbhani2026');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="max-w-md w-full glass-dropdown p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Administrator Portal
          </h3>
          <p className="text-xs text-slate-500">
            Jayashree Krishi Agro Farmer Producer Company Ltd.
          </p>
        </div>

        {/* Forgot password mode */}
        {showForgot ? (
          <form onSubmit={handleReset} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600">
              Enter your registered administrator email to receive reset instructions.
            </div>

            {resetMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{resetMsg}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Admin Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jayashreeagro.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
              >
                ← Back to Login
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : (
          /* Main Login Form */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 block">Administrator Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jayashreeagro.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-emerald-700 hover:underline font-medium text-[11px] cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-emerald-500 shadow-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isSubmitting ? 'Verifying Credentials...' : 'Authenticate & Open Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Evaluation shortcut badge */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Authorized initial account</span>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="text-[11px] text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>Fill Default Credentials</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
