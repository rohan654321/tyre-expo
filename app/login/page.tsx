'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Mock successful login
        localStorage.setItem('tyre_expo_token', 'mock_token_123');
        localStorage.setItem('tyre_exhibitor_data', JSON.stringify({
          id: '1',
          company: 'TyreTech Industries',
          email: email,
          name: 'Rajesh Kumar',
          boothNumber: 'T-42'
        }));
        router.push('/dashboard');
      } else {
        setError('Please enter email and password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('exhibitor@tyre-expo.com');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl p-8">
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-100 h-20 mb-4">
            <Image src="/ITS_logo_white.png" alt="Tyre Expo Logo" width={100} height={80} />
            </div>
            <h2 className="text-3xl font-bold text-white">INDIA TYRE SHOW 2027</h2>
            <p className="text-gray-300 mt-2">Exhibitor Portal Login</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                placeholder="exhibitor@tyre-expo.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-300">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-amber-400 hover:text-amber-300 transition">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-xs text-gray-400 mb-3">Demo Credentials</p>
            <button
              onClick={handleDemoLogin}
              className="w-full text-sm text-gray-300 hover:text-white transition flex items-center justify-center gap-2"
            >
              <span className="opacity-70">📧</span> exhibitor@tyre-expo.com
              <span className="mx-2">•</span>
              <span className="opacity-70">🔒</span> password123
            </button>
          </div>

        </div>

        <p className="text-center text-gray-500 text-xs mt-8">
          © 2024 India Tyre Expo. All rights reserved.
        </p>
      </div>
    </div>
  );
}