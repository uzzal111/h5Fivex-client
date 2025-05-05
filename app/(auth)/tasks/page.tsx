'use client';

import React, { useState, useEffect } from 'react';
import { FiLock, FiUnlock, FiArrowLeft, FiDollarSign } from 'react-icons/fi';
import { FaCrown, FaGem, FaMedal, FaTrophy, FaCoins } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Product images for different states (static images and GIFs)
 */
const productImages = {
  tv: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  speaker: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
  tvGif: 'https://i.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.webp',
  speakerGif: 'https://i.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.webp',
  headphonesGif: 'https://i.giphy.com/media/l378zKVk7Eh3yHoJi/giphy.webp'
};

/**
 * Interface defining the structure of a VIP tier
 */
interface VipTier {
  level: string;
  commission: string;
  orders: number;
  requirement: number;
  logo: React.ReactElement;
  color: string;
  bgColor: string;
}

/**
 * Interface defining the structure of a product
 */
interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  refund: string;
  commission: string;
  image: string;
  tv: string;
  category: string;
}

/**
 * VIP tiers configuration with different levels, commissions, and requirements
 */
const vipTiers: VipTier[] = [
  {
    level: 'VIP1',
    commission: '1.2%-2.4%',
    orders: 5,
    requirement: 35,
    logo: <FaMedal className="text-amber-400" />,
    color: 'from-amber-100 to-amber-50',
    bgColor: 'bg-amber-50'
  },
  {
    level: 'VIP2',
    commission: '1.8%-3.3%',
    orders: 5,
    requirement: 300,
    logo: <FaMedal className="text-gray-400" />,
    color: 'from-gray-100 to-gray-50',
    bgColor: 'bg-gray-50'
  },
  {
    level: 'VIP3',
    commission: '3%-3.8%',
    orders: 5,
    requirement: 3000,
    logo: <FaMedal className="text-amber-600" />,
    color: 'from-orange-100 to-amber-50',
    bgColor: 'bg-amber-50'
  },
  {
    level: 'VIP4',
    commission: '3.8%-4.3%',
    orders: 5,
    requirement: 10000,
    logo: <FaTrophy className="text-yellow-500" />,
    color: 'from-yellow-100 to-yellow-50',
    bgColor: 'bg-yellow-50'
  },
  {
    level: 'VIP5',
    commission: '3%-4.8%',
    orders: 5,
    requirement: 30000,
    logo: <FaGem className="text-blue-400" />,
    color: 'from-blue-100 to-blue-50',
    bgColor: 'bg-blue-50'
  },
  {
    level: 'VIP6',
    commission: '5.3%-8%',
    orders: 5,
    requirement: 100000,
    logo: <FaCrown className="text-purple-500" />,
    color: 'from-purple-100 to-purple-50',
    bgColor: 'bg-purple-50'
  }
];

/**
 * Sample products data with images, prices, and commissions
 */
const products: Product[] = [
  {
    id: 1,
    name: 'Smart TV 4K UHD',
    brand: 'Samsung',
    price: '$999.00',
    refund: '$999.99',
    commission: '$0.99',
    image: productImages.tv,
    tv: productImages.tvGif,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Premium Bluetooth Speaker',
    brand: 'Bose',
    price: '$149.00',
    refund: '$149.99',
    commission: '$0.45',
    image: productImages.speaker,
    tv: productImages.speakerGif,
    category: 'Audio'
  },
  {
    id: 3,
    name: 'Wireless Headphones Pro',
    brand: 'Sony',
    price: '$199.00',
    refund: '$199.99',
    commission: '$0.75',
    image: productImages.headphones,
    tv: productImages.headphonesGif,
    category: 'Audio'
  }
];

/**
 * Main VIP Tasks component with all functionality
 */
export default function TaskPage() {
  // State management for the application
  const [view, setView] = useState<'vip' | 'summary' | 'preview' | 'grab' | 'result'>('vip');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [taskCount, setTaskCount] = useState(0);
  const [maxTasks] = useState(5);
  const [deposit, setDeposit] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [todayProfit, setTodayProfit] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState<string>('');

  // Effect to reset tasks at midnight
  useEffect(() => {
    const reset = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        setTaskCount(0);
        setTodayProfit(0);
      }
    }, 60000);
    return () => clearInterval(reset);
  }, []);

  /**
   * Check if a VIP tier is unlocked based on deposit amount
   */
  const isTierUnlocked = (req: number) => deposit >= req;

  /**
   * Handle deposit of funds into the account
   */
  const handleDeposit = (amount?: number) => {
    const depositValue = amount !== undefined ? amount : Number(depositAmount);
    
    if (isNaN(depositValue)) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (depositValue <= 0) {
      toast.error('Deposit amount must be positive');
      return;
    }
    
    setDeposit(prev => prev + depositValue);
    setShowDepositModal(false);
    setDepositAmount('');
    
    toast.success(
      <div className="flex items-center">
        <FiDollarSign className="text-green-500 mr-2" />
        <span>${depositValue.toLocaleString()} deposited successfully!</span>
      </div>,
      {
        duration: 3000,
        style: {
          background: 'linear-gradient(to right, #ffffff, #f9fafb)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(209, 213, 219, 0.5)',
        }
      }
    );
  };

  /**
   * Start the product preview animation
   */
  const startPreview = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const product = products[Math.floor(Math.random() * products.length)];
      setSelectedProduct(product);
      setView('preview');
      setIsAnimating(false);
    }, 800);
  };

  /**
   * Handle grabbing a task/order
   */
  const handleGrab = () => {
    if (taskCount >= maxTasks || !selectedProduct) return;

    // Play sound effect
    new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_f8fcbbe2a3.mp3').play().catch(() => {});
    setView('grab');

    setTimeout(() => {
      // Show confetti effect
      confetti({ 
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#9370DB'],
        shapes: ['circle', 'star'],
        scalar: 1.2
      });
      
      // Calculate and update profits
      const profit = parseFloat(selectedProduct.commission.slice(1));
      setTodayProfit(prev => +(prev + profit).toFixed(4));
      setTotalProfit(prev => +(prev + profit).toFixed(4));
      setTaskCount(prev => prev + 1);
      
      // Show success toast
      toast.success(
        <div className="flex items-center">
          <FaCoins className="text-yellow-500 mr-2" />
          <span>+{selectedProduct.commission} commission earned!</span>
        </div>,
        { 
          duration: 5000,
          style: {
            background: 'linear-gradient(to right, #ffffff, #f9fafb)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(209, 213, 219, 0.5)',
          }
        }
      );
      
      setView('result');
    }, 3500);
  };

  /**
   * Handle image loading errors
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
  };

  /**
   * Render the VIP cards section with all tiers
   */
  const renderVIPCards = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full"
    >
      {vipTiers.map((tier, i) => (
        <motion.div
          key={i}
          whileHover={{ y: window.innerWidth > 768 ? -5 : 0 }}
          className={`relative rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg transition-all duration-300 ${
            isTierUnlocked(tier.requirement) 
              ? `bg-gradient-to-br ${tier.color} ring-1 md:ring-2 ring-yellow-400` 
              : 'bg-gray-50/80 opacity-90'
          }`}
        >
          {/* Mobile header for card */}
          <div className="md:hidden flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="text-2xl mr-2">
                {React.cloneElement(tier.logo, {
                  className: `${tier.logo.props.className} ${isTierUnlocked(tier.requirement) ? 'opacity-100' : 'opacity-60'}`
                })}
              </div>
              <h3 className="text-lg font-bold">{tier.level}</h3>
            </div>
            {isTierUnlocked(tier.requirement) ? (
              <FiUnlock className="text-green-500 text-lg" />
            ) : (
              <FiLock className="text-gray-400 text-lg" />
            )}
          </div>

          {/* Desktop logo position */}
          <div className="hidden md:block absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg z-10">
            <div className="text-3xl">
              {React.cloneElement(tier.logo, { 
                className: `${tier.logo.props.className} ${isTierUnlocked(tier.requirement) ? 'opacity-100' : 'opacity-60'}` 
              })}
            </div>
          </div>
          
          <div className="flex flex-col h-full">
            {/* Desktop header */}
            <div className="hidden md:flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{tier.level}</h3>
              {isTierUnlocked(tier.requirement) ? (
                <FiUnlock className="text-green-500 text-xl" />
              ) : (
                <FiLock className="text-gray-400 text-xl" />
              )}
            </div>
            
            {/* Card content */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 flex-grow">
              <p className="text-sm md:text-base">
                <span className="text-gray-600">Commission: </span>
                <span className="font-bold text-amber-600">{tier.commission}</span>
              </p>
              <p className="text-sm md:text-base">
                <span className="text-gray-600">Orders/day: </span>
                <span>{tier.orders}</span>
              </p>
              <div className="mt-2 md:mt-4">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${deposit >= tier.requirement ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min(100, (deposit / tier.requirement) * 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Need: ${tier.requirement.toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Action button */}
            {isTierUnlocked(tier.requirement) ? (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('summary')}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg md:rounded-xl text-sm md:text-base font-medium"
              >
                <span className="md:hidden">Start Tasks</span>
                <span className="hidden md:inline">Access Dashboard</span>
              </motion.button>
            ) : (
              <button 
                onClick={() => {
                  setShowDepositModal(true);
                  setDepositAmount((tier.requirement - deposit).toString());
                }}
                className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 py-2 rounded-lg md:rounded-xl text-sm md:text-base font-medium"
              >
                Deposit
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  /**
   * Render the task summary dashboard
   */
  const renderSummary = () => (
    <motion.div
      key="summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl w-full bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg mx-auto"
    >
      <div className="relative h-40 md:h-64 overflow-hidden rounded-lg mb-4 md:mb-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <img
          src={selectedProduct?.tv || products[0].tv}
          className="w-full h-full object-cover"
          alt="Product Preview"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 text-left">
          <h3 className="text-white font-bold text-lg md:text-xl">Today's Opportunities</h3>
          <p className="text-gray-200 text-sm md:text-base">Complete tasks to earn</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
          <p className="text-xs md:text-sm text-blue-600">Total Profit</p>
          <p className="text-base md:text-lg font-bold text-blue-800">${totalProfit.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-2 md:p-3 rounded-lg">
          <p className="text-xs md:text-sm text-green-600">Today's Profit</p>
          <p className="text-base md:text-lg font-bold text-green-800">${todayProfit.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
          <p className="text-xs md:text-sm text-purple-600">Tasks</p>
          <p className="text-base md:text-lg font-bold text-purple-800">{taskCount}/{maxTasks}</p>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        onClick={startPreview}
        disabled={taskCount >= maxTasks}
        className={`w-full py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base ${
          taskCount >= maxTasks 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
        }`}
      >
        {isAnimating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Preparing...
          </span>
        ) : (
          <>
            🚀 Grab Order
            {taskCount < maxTasks && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/20 rounded-full">
                {maxTasks - taskCount} left
              </span>
            )}
          </>
        )}
      </motion.button>
      
      {taskCount >= maxTasks && (
        <p className="mt-2 text-xs md:text-sm text-center text-gray-500">
          Completed all tasks today
        </p>
      )}
    </motion.div>
  );

  /**
   * Render the product preview view
   */
  const renderPreview = () => {
    if (!selectedProduct) return null;
    
    return (
      <motion.div
        key="preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg mx-auto"
      >
        <div className="text-center mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Product Preview</h2>
          <p className="text-xs md:text-sm text-gray-500">Complete the task to earn commission</p>
        </div>

        <div className="relative group mb-4 md:mb-6">
          <img 
            src={selectedProduct.image} 
            className="w-full h-40 md:h-64 object-contain mx-auto rounded-lg border-2 border-white shadow-lg"
            alt={selectedProduct.name}
            onError={handleImageError}
          />
        </div>
        
        <div className="mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">{selectedProduct.name}</h3>
          <p className="text-xs md:text-sm text-gray-500 mb-3">{selectedProduct.brand} • {selectedProduct.category}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Price</p>
              <p className="font-medium text-sm md:text-base">{selectedProduct.price}</p>
            </div>
            <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Refund</p>
              <p className="font-medium text-sm md:text-base">{selectedProduct.refund}</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 md:p-4 rounded-lg border border-green-200">
            <p className="text-xs md:text-sm text-green-600 mb-1 uppercase tracking-wider">Your Commission</p>
            <p className="text-xl md:text-2xl font-bold text-green-700 flex items-center">
              <FiDollarSign className="mr-1" /> {selectedProduct.commission.slice(1)}
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGrab}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm md:text-base shadow-md"
        >
          ▶ Start Task Now
        </motion.button>
      </motion.div>
    );
  };

  /**
   * Render the order processing view
   */
  const renderGrabView = () => (
    <motion.div
      key="grab"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full px-4"
    >
      <div className="relative w-40 h-40 md:w-64 md:h-64 mb-6 md:mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 shadow-lg"
        ></motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 md:inset-6 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-md"
        ></motion.div>
        <div className="absolute inset-8 md:inset-10 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
          <motion.img
            src={selectedProduct?.image || ''}
            className="w-16 h-16 md:w-24 md:h-24 object-contain"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            alt="Processing"
            onError={handleImageError}
          />
        </div>
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Processing Your Order</h3>
        <p className="text-blue-600 text-sm md:text-base mb-4 md:mb-6">
          Verifying cashback eligibility and preparing your commission...
        </p>
        
        <div className="w-full bg-blue-100 rounded-full h-2 mb-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          ></motion.div>
        </div>
        
        <p className="text-xs md:text-sm text-gray-500">This usually takes 3-5 seconds...</p>
      </div>
    </motion.div>
  );

  /**
   * Render the task completion result view
   */
  const renderResult = () => {
    if (!selectedProduct) return null;
    
    return (
      <motion.div
        key="result"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md px-4"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl blur opacity-20 animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-white to-emerald-50 text-gray-800 p-4 md:p-6 rounded-xl shadow-lg text-center border border-emerald-200">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 md:mb-6"
          >
            <div className="text-4xl md:text-5xl mb-2">🎉</div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">Task Completed!</h2>
            <p className="text-green-600 font-medium text-sm md:text-base">Commission Earned</p>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group mb-4 md:mb-6"
          >
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-40 md:h-48 object-contain rounded-lg border-2 border-white shadow-md mx-auto bg-white"
              onError={handleImageError}
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4 md:mb-6"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-1">{selectedProduct.name}</h3>
            <div className="flex justify-center space-x-4 md:space-x-6 text-xs md:text-sm mb-3">
              <div>
                <p className="text-gray-500">Price</p>
                <p>{selectedProduct.price}</p>
              </div>
              <div>
                <p className="text-gray-500">Refund</p>
                <p>{selectedProduct.refund}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 md:p-4 rounded-lg mb-4 md:mb-6 border border-green-200"
          >
            <p className="text-xs md:text-sm text-green-600 mb-1 uppercase tracking-wider">Commission Earned</p>
            <p className="text-2xl md:text-3xl font-bold text-green-700">{selectedProduct.commission}</p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: window.innerWidth > 768 ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView(taskCount >= maxTasks ? 'summary' : 'preview')}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 md:py-3 rounded-lg font-bold text-sm md:text-base shadow-md"
          >
            {taskCount >= maxTasks ? (
              <span className="flex items-center justify-center">
                <FiArrowLeft className="mr-2" /> Return to Dashboard
              </span>
            ) : (
              `Continue to Next Task (${taskCount}/${maxTasks})`
            )}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  /**
   * Render the deposit modal
   */
  const renderDepositModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowDepositModal(false)}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Deposit Funds</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Deposit ($)
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setDepositAmount('100')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
          >
            $100
          </button>
          <button
            onClick={() => setDepositAmount('500')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
          >
            $500
          </button>
          <button
            onClick={() => setDepositAmount('1000')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
          >
            $1000
          </button>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setShowDepositModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeposit()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-800 px-4 py-8 flex flex-col items-center font-sans">
      {/* Toast notifications */}
      <Toaster
        position={typeof window !== 'undefined' && window.innerWidth > 768 ? "top-right" : "top-center"}
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: 'linear-gradient(to right, #ffffff, #f9fafb)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(209, 213, 219, 0.5)',
            color: '#374151',
            maxWidth: typeof window !== 'undefined' && window.innerWidth > 768 ? 'auto' : '90vw',
            fontSize: '14px'
          },
        }}
      />

      <div className="w-full max-w-6xl mb-8">
        {/* Mobile Header */}
        <div className="md:hidden flex flex-col mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              VIP Tasks
            </h1>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">${deposit.toLocaleString()}</span>
              <button 
                onClick={() => {
                  setShowDepositModal(true);
                  setDepositAmount('');
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm shadow flex items-center"
              >
                <GiCash className="mr-1" /> Deposit
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Earn commissions daily</p>
        </div>

        {/* Desktop Header */}
        <motion.div 
          className="hidden md:flex justify-between items-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              VIP Tasks Dashboard
            </h1>
            <p className="text-sm text-gray-500">Complete tasks and earn commissions daily</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 flex items-center">
              <span className="text-gray-600 mr-2">Balance:</span>
              <span className="font-bold flex items-center">
                <FiDollarSign className="mr-1" /> {deposit.toLocaleString()}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowDepositModal(true);
                setDepositAmount('');
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl flex items-center"
            >
              <GiCash className="mr-2" /> Deposit
            </motion.button>
          </div>
        </motion.div>
        
        {/* Main content area with animated transitions between views */}
        <AnimatePresence mode="wait">
          {view === 'vip' && renderVIPCards()}
          {view === 'summary' && renderSummary()}
          {view === 'preview' && renderPreview()}
          {view === 'grab' && renderGrabView()}
          {view === 'result' && renderResult()}
        </AnimatePresence>
      </div>

      {/* Deposit modal */}
      {showDepositModal && renderDepositModal()}
    </div>
  );
}