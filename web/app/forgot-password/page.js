'use client';

import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <svg
              className="w-8 h-8 text-[#8B0000]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Forgot Password?
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-8">
            Password recovery functionality is coming soon. Please contact support for assistance.
          </p>

          {/* Back to Login */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-[#8B0000] to-[#7A0000] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#7A0000] hover:to-[#6A0000] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <HiArrowLeft size={20} />
            <span>Back to Login</span>
          </Link>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Contact{' '}
              <a
                href="mailto:support@wildkits.com"
                className="text-[#8B0000] hover:text-[#7A0000] font-semibold"
              >
                support@wildkits.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
