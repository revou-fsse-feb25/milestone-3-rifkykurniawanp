"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

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
          
          {/* Steins;Gate Character Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Okabe Illustration using CSS */}
              <div className="w-48 h-64 mx-auto mb-6 relative">
                {/* Head */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full border-2 border-amber-400">
                  {/* Hair */}
                  <div className="absolute -top-2 left-2 w-12 h-8 bg-amber-600 rounded-t-full"></div>
                  <div className="absolute -top-1 -left-1 w-6 h-10 bg-amber-600 rounded-full transform -rotate-12"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-8 bg-amber-600 rounded-full transform rotate-12"></div>
                  {/* Eyes */}
                  <div className="absolute top-6 left-3 w-2 h-2 bg-amber-800 rounded-full"></div>
                  <div className="absolute top-6 right-3 w-2 h-2 bg-amber-800 rounded-full"></div>
                  {/* Mouth */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-amber-700 rounded-full"></div>
                </div>
                {/* Lab Coat */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-white border-2 border-yellow-400 rounded-lg">
                  <div className="absolute top-2 left-2 right-2 h-4 bg-yellow-100 rounded"></div>
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-amber-700">404</div>
                </div>
                {/* Arms */}
                <div className="absolute top-20 left-4 w-4 h-16 bg-white border-2 border-yellow-400 rounded-full transform -rotate-12"></div>
                <div className="absolute top-20 right-4 w-4 h-16 bg-white border-2 border-yellow-400 rounded-full transform rotate-12"></div>
                {/* Legs */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-x-4 w-6 h-20 bg-amber-800 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-4 w-6 h-20 bg-amber-800 rounded-full"></div>
              </div>
            </div>
          </div>

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