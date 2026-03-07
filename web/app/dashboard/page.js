'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/services/api';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    // Initialize user state from localStorage
    return authAPI.getCurrentUser();
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleLogout = () => {
    authAPI.logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B0000]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#8B0000]">WildKits</h1>
              <p className="text-sm text-gray-600">Campus Marketplace</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#7A0000] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            {/* Welcome Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {user.name || user.email}! 🎉
              </h2>
              <p className="text-lg text-gray-600">
                You&apos;ve successfully logged into WildKits
              </p>
            </div>

            {/* User Info Card */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-[#8B0000] to-[#7A0000] text-white rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mx-auto mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
              <p className="text-white/80">{user.email}</p>
              {user.user_id && (
                <p className="text-white/60 text-sm mt-2">User ID: {user.user_id}</p>
              )}
            </div>

            {/* Next Steps */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                What&apos;s Next?
              </h3>
              <p className="text-gray-600 mb-6">
                This is a placeholder dashboard. The full marketplace features are coming soon!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Browse Items</h4>
                  <p className="text-sm text-gray-600">Find textbooks and materials</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">💼</div>
                  <h4 className="font-semibold text-gray-900 mb-1">List Products</h4>
                  <p className="text-sm text-gray-600">Sell your unused items</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">🤝</div>
                  <h4 className="font-semibold text-gray-900 mb-1">Connect</h4>
                  <p className="text-sm text-gray-600">Meet fellow Technologians</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
