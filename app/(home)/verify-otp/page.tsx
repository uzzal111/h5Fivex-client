// app/verify-otp/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    let timer: any;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setIsResendEnabled(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      toast.success('OTP Verified!');
      router.push('/reset-password');
    } else {
      setError('Invalid OTP');
      toast.error('Wrong OTP! Please try again.');
    }
  };

  const handleResend = () => {
    setIsResendEnabled(false);
    setResendTimer(30);
    toast.success('OTP Resent! (Demo)');
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
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">BITNEX</h1>
          <h2 className="text-2xl font-extrabold text-indigo-700 drop-shadow-md">Verify OTP</h2>
          <p className="text-gray-700 mt-2 text-base">Enter the 6-digit code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={handleChange}
              maxLength={6}
              placeholder="Enter OTP"
              className={`w-full px-4 py-3 rounded-2xl bg-white/80 border ${error ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-center tracking-widest text-xl`}
            />
            {error && <p className="text-xs text-red-500 pt-1 text-center">{error}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 py-3 rounded-2xl text-white font-bold shadow-md transition-transform transform hover:scale-105"
            >
              Verify OTP
            </button>
          </div>

          {/* Resend OTP */}
          <div className="text-center mt-6">
            {isResendEnabled ? (
              <button 
                type="button" 
                onClick={handleResend}
                className="text-indigo-600 hover:underline font-bold text-sm"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-600 text-sm">Resend in {resendTimer} sec</p>
            )}
          </div>

          {/* Back to Login */}
          <div className="text-center text-sm text-gray-600 mt-6">
            Remember password?{' '}
            <Link href="/login" className="font-bold text-indigo-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
