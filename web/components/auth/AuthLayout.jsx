'use client';

import React from 'react';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Hero Section */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#8B0000] to-[#7A0000] text-white p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(255,255,255,0.05) 10px,
              rgba(255,255,255,0.05) 20px
            )`
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg mx-auto lg:mx-0">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold mb-2 tracking-tight">
              WildKits
            </h1>
            <div className="h-1 w-24 bg-[#FFC107] rounded-full"></div>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-[#FFC107]">
            Buy, Sell & Lend Within Campus
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-100 leading-relaxed mb-8">
            WildKits connects Technologians at CIT-U to safely trade textbooks,
            electronics, uniforms, and academic materials within the campus community.
          </p>

          {/* Features List */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#FFC107] rounded-full"></div>
              <span className="text-gray-100">Campus-Exclusive Marketplace</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#FFC107] rounded-full"></div>
              <span className="text-gray-100">Safe Peer-to-Peer Trading</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#FFC107] rounded-full"></div>
              <span className="text-gray-100">Rent, Buy & Sell Academic Items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 bg-gray-50 p-8 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10">
            {/* Title */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-[#333] mb-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Content */}
            {children}
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            CIT-U Students Only • Campus Community
          </p>
        </div>
      </div>
    </div>
  );
}
