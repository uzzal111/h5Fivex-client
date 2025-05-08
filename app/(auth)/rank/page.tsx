'use client';

import React from 'react';
import { 
  FiAward,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiCheckCircle,
  FiGift,
  FiTrendingUp,
  FiUserCheck,
  FiBarChart2
} from 'react-icons/fi';
import { motion } from 'framer-motion';

interface RewardTier {
  id: number;
  title: string;
  target: string;
  reward: string;
  bonus: string;
  progress: number;
  completed: boolean;
  icon: React.ReactNode;
  color: string;
}

const RankRewardPage = () => {
  const rewardTiers: RewardTier[] = [
    {
      id: 1,
      title: "Starter",
      target: "Invite 10 direct members with $100 deposit",
      reward: "40 USDT",
      bonus: "+ Basic Rank Badge",
      progress: 10, // Example: 7/10 completed
      completed: false,
      icon: <FiStar className="text-yellow-500" />,
      color: "from-yellow-50 to-yellow-100 border-yellow-200"
    },
    {
      id: 2,
      title: "Achiever",
      target: "Invite 20 direct members with $100 deposit",
      reward: "80 USDT",
      bonus: "+ Silver Rank Badge",
      progress: 15, // Example: 15/20 completed
      completed: false,
      icon: <FiTrendingUp className="text-blue-500" />,
      color: "from-blue-50 to-blue-100 border-blue-200"
    },
    {
      id: 3,
      title: "Champion",
      target: "Invite 50 direct members with $100 deposit",
      reward: "200 USDT",
      bonus: "+ Gold Rank Badge",
      progress: 32, // Example: 32/50 completed
      completed: false,
      icon: <FiAward className="text-purple-500" />,
      color: "from-purple-50 to-purple-100 border-purple-200"
    },
    {
      id: 4,
      title: "Elite",
      target: "Invite 100 direct members with $100 deposit",
      reward: "500 USDT",
      bonus: "+ Diamond Rank Badge + Exclusive Rewards",
      progress: 68, // Example: 68/100 completed
      completed: false,
      icon: <FiGift className="text-pink-500" />,
      color: "from-pink-50 to-pink-100 border-pink-200"
    },
    {
      id: 5,
      title: "Task 3",
      target: "Invite 20 members to make a deposit",
      reward: "100 USDT",
      bonus: "+ Bonus Rewards",
      progress: 12, // Example: 12/20 completed
      completed: false,
      icon: <FiBarChart2 className="text-green-500" />,
      color: "from-green-50 to-green-100 border-green-200"
    },
    {
      id: 6,
      title: "Task 4",
      target: "Invite 50 members to make a deposit",
      reward: "500 USDT",
      bonus: "+ Special Bonus",
      progress: 28, // Example: 28/50 completed
      completed: false,
      icon: <FiUsers className="text-indigo-500" />,
      color: "from-indigo-50 to-indigo-100 border-indigo-200"
    },
    {
      id: 7,
      title: "Task 5",
      target: "Invite 100 members to make a deposit",
      reward: "1000 USDT",
      bonus: "+ VIP Rewards",
      progress: 45, // Example: 45/100 completed
      completed: false,
      icon: <FiCheckCircle className="text-red-500" />,
      color: "from-red-50 to-red-100 border-red-200"
    }
  ];

  const stats = {
    directReferrals: 89,
    directActiveMembers: 67,
    totalEarned: 1240,
    nextReward: "Achiever (15/20)"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <FiAward className="mr-3 text-yellow-500" />
            Rank & Reward Program
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete tasks, earn rewards, and climb the ranks to unlock exclusive benefits
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          <StatCard 
            icon={<FiUsers className="text-blue-500" />}
            title="Direct Referrals"
            value={stats.directReferrals}
            color="blue"
          />
          <StatCard 
            icon={<FiUserCheck className="text-green-500" />}
            title="Direct Active Members"
            value={stats.directActiveMembers}
            color="green"
          />
          
        </div>

        {/* Reward Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewardTiers.map((tier) => (
            <RewardCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiGift className="mr-2 text-pink-500" />
            How It Works
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Invite friends to join and make their first deposit
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Earn rewards when they complete qualifying deposits
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Climb through the ranks for bigger bonuses
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Rewards are paid automatically within 24 hours
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: string;
}> = ({ icon, title, value, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };

  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className={`p-4 rounded-xl border ${colors[color as keyof typeof colors]} shadow-sm`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
          <p className="text-lg sm:text-xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-white">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const RewardCard: React.FC<{ tier: RewardTier }> = ({ tier }) => {
  const progressPercentage = Math.min(100, (tier.progress / parseInt(tier.target.split(' ')[1])) * 100);
  const isCompleted = progressPercentage === 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`border rounded-xl overflow-hidden bg-gradient-to-r ${tier.color}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              {tier.icon}
              <span className="ml-2">{tier.title}</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{tier.target}</p>
          </div>
          {isCompleted && (
            <span className="bg-white text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
              <FiCheckCircle className="mr-1" /> Completed
            </span>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress: {tier.progress}/{tier.target.split(' ')[1]}</span>
            <span className="font-bold">{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">Reward</p>
            <p className="font-bold text-green-600">{tier.reward}</p>
          </div>
          <div className="bg-white/80 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">Bonus</p>
            <p className="font-bold text-purple-600">{tier.bonus}</p>
          </div>
        </div>

        <button
          className={`mt-4 w-full ${isCompleted ? 'bg-green-600' : 'bg-gray-300'} text-white py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition`}
          disabled={!isCompleted}
        >
          {isCompleted ? 'Claim Reward' : 'Target Not Reached'}
        </button>
      </div>
    </motion.div>
  );
};

export default RankRewardPage;
