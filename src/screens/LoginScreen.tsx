import React, { useState } from 'react';
import { Scale, Shield, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('rajesh.kumar@legalmetrology.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Branding */}
        <div className="bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white mb-6 shadow-sm">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-3">
              Legal Metrology Compliance System
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Digital inspection and compliance management platform for packaged commodities, enforcement verification, and statutory reporting.
            </p>
          </div>

          <div className="space-y-4 pt-10 border-t border-slate-800">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Ministry of Consumer Affairs, Food & Public Distribution</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Authorized personnel only. All access logs and inspection activities are audited under IT Act 2000.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">Officer Portal Login</h2>
            <p className="text-xs text-slate-500 mt-1">Enter your official credentials to access your inspection queue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="officer@legalmetrology.gov.in"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span className="text-slate-600">Remember me for 30 days</span>
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-blue-600 hover:underline font-medium">
                Reset credentials
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
            Secure 256-bit SSL Government Encryption
          </div>
        </div>
      </div>
    </div>
  );
}
