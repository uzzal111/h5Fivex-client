// app/login/page.tsx
'use client';

import { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors!');
      return;
    }
    setIsLoading(true);
    try {
      // Simulate login logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Logged in successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-200 to-indigo-100 flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl p-10 border border-white/30"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">h5Fivex</h1>
          <h2 className="text-2xl font-extrabold text-indigo-700 drop-shadow-md">Login</h2>
          <p className="text-gray-700 mt-2 text-base">Welcome Back!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FiUser className="absolute top-4 left-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full pl-12 pr-4 py-3 rounded-2xl bg-white/80 border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
            />
            {errors.email && <p className="text-xs text-red-500 pt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-4 left-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-12 pr-12 py-3 rounded-2xl bg-white/80 border ${errors.password ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-300 focus:border-blue-300`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-4 right-4 text-gray-500">
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <p className="text-xs text-red-500 pt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 py-3 rounded-2xl text-white font-bold shadow-md transition-transform transform hover:scale-105"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            <Link href="/verify-email" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
