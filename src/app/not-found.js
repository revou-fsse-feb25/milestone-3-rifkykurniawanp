"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import React from 'react';

export default function NotFound() {
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const [currentQuote, setCurrentQuote] = useState('');
  const [isClient, setIsClient] = useState(false);

  const okabeQuotes = [
    "I am the mad scientist, Hououin Kyouma!",
    "This is the choice of Steins Gate!",
    "The Organization is always watching...",
    "El Psy Kongroo"
  ];

  useEffect(() => {
    setIsClient(true);
    setCurrentQuote(okabeQuotes[Math.floor(Math.random() * okabeQuotes.length)]);
    setCurrentTime(formatTime(new Date()));

    const timeInterval = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Head>
        <title>404 - Worldline Error | Steins;Gate</title>
        <meta name="description" content="Page not found in this worldline" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-400">
            
            {/* 404 Title */}
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600 mb-4">
              404
            </h1>
            
            {/* Steins;Gate Logo */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-amber-700 mb-2 font-mono tracking-wider">
                STEINS;GATE
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto rounded-full"></div>
            </div>

            {/* Divergence Meter */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 mb-6 max-w-sm mx-auto">
              <div className="text-amber-600 text-xs font-mono mb-1">WORLDLINE DIVERGENCE</div>
              <div className="text-amber-800 text-xl font-bold font-mono tracking-wider">1.130426%</div>
              <div className="text-amber-600 text-xs font-mono mt-1">TIME: {currentTime}</div>
            </div>

            {/* Error Message */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-amber-800 mb-3">
                Worldline Error Detected
              </h3>
              <p className="text-amber-700 text-lg mb-4">
                The page you're looking for exists in a different timeline.
              </p>
            </div>

            {/* Quote */}
            {currentQuote && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 italic">
                <p className="text-amber-800 text-lg">"{currentQuote}"</p>
                <p className="text-amber-600 text-sm mt-2 text-right">- Okabe Rintaro</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold rounded-full hover:from-amber-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  🏠 Return to Alpha Worldline
                </button>
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="px-8 py-3 bg-transparent border-2 border-amber-400 text-amber-700 font-bold rounded-full hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
              >
                ⏪ Go Back
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-amber-600 text-sm">
              El Psy Kongroo 🔬
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 text-2xl opacity-30 animate-bounce">⚗️</div>
          <div className="absolute top-20 right-10 text-2xl opacity-30 animate-bounce" style={{animationDelay: '1s'}}>🧪</div>
          <div className="absolute bottom-20 left-10 text-2xl opacity-30 animate-bounce" style={{animationDelay: '2s'}}>📡</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </>
  );
}