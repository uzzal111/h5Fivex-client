'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FiUser, FiDollarSign, FiCreditCard, FiClock, 
  FiPieChart, FiTrendingUp, FiUsers, FiMessageSquare,
  FiSettings, FiLogOut, FiChevronRight, FiCheckCircle,
  FiEdit, FiUpload, FiImage, FiLock, FiKey
} from 'react-icons/fi';

const ProfilePage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('asset-details');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-avatar.jpg');
  const [email, setEmail] = useState('user@example.com');
  const [newEmail, setNewEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userData = {
    id: '2290256',
    accountNumber: '383-49647176',
    balance: 278.06,
    yesterdayEarnings: 6.17,
    pendingFunds: 0,
    totalEarnings: 173.18,
    availableFunds: 278.06,
    todayEarnings: 6.64,
    teamCommissions: 91.88,
    vipChannel: 'VIP1Channel',
    connections: 28,
    teamMembers: 169,
    comments: 169
  };

  const transactionHistory = [
    { id: 1, type: 'Deposit', amount: 100.00, date: '2025-05-10', status: 'Completed' },
    { id: 2, type: 'Withdrawal', amount: -50.00, date: '2025-05-08', status: 'Completed' },
    { id: 3, type: 'Commission', amount: 12.50, date: '2025-05-07', status: 'Completed' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handleEmailChange = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(newEmail);
    setNewEmail('');
    setShowEmailForm(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password change logic here
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'order-record':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Transaction History</h3>
            <div className="space-y-4">
              {transactionHistory.map((txn) => (
                <div key={txn.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{txn.type}</p>
                    <p className="text-sm text-gray-500">{txn.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount > 0 ? '+' : ''}{txn.amount.toFixed(2)} USDT
                    </p>
                    <div className="flex items-center justify-end">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        txn.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                      <p className="text-xs text-gray-500">{txn.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'asset-details':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Asset Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AssetDetailCard 
                icon={<FiDollarSign className="text-blue-500" />}
                label="Total Balance"
                value={`${userData.balance.toFixed(2)} USDT`}
                bgColor="bg-blue-50"
              />
              <AssetDetailCard 
                icon={<FiTrendingUp className="text-green-500" />}
                label="Available Funds"
                value={`${userData.availableFunds.toFixed(2)} USDT`}
                bgColor="bg-green-50"
              />
              <AssetDetailCard 
                icon={<FiClock className="text-yellow-500" />}
                label="Today's Earnings"
                value={`${userData.todayEarnings.toFixed(2)} USDT`}
                bgColor="bg-yellow-50"
              />
              <AssetDetailCard 
                icon={<FiPieChart className="text-purple-500" />}
                label="Yesterday's Earnings"
                value={`${userData.yesterdayEarnings.toFixed(2)} USDT`}
                bgColor="bg-purple-50"
              />
              <AssetDetailCard 
                icon={<FiUsers className="text-indigo-500" />}
                label="Team Commissions"
                value={`${userData.teamCommissions.toFixed(2)} USDT`}
                bgColor="bg-indigo-50"
              />
              <AssetDetailCard 
                icon={<FiDollarSign className="text-teal-500" />}
                label="Total Earnings"
                value={`${userData.totalEarnings.toFixed(2)} USDT`}
                bgColor="bg-teal-50"
              />
            </div>
          </div>
        );
      case 'change-email':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Change Email</h3>
            {showEmailForm ? (
              <form onSubmit={handleEmailChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Email</label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-800">{email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Email</label>
                  <div className="bg-gray-50 p-3 rounded-lg text-gray-800">{email}</div>
                </div>
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center font-medium"
                >
                  <FiEdit className="mr-2" />
                  Change Email
                </button>
              </div>
            )}
          </div>
        );
      case 'login-password':
      case 'withdrawal-password':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 mt-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              {activeTab === 'login-password' ? 'Change Login Password' : 'Change Withdrawal Password'}
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Update Password
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          {/* Profile Picture with Upload */}
          <div className="flex flex-col items-center pt-6">
            <div className="relative group mb-4">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition transform translate-y-1/4 group-hover:opacity-100 opacity-90"
              >
                <FiUpload size={16} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Account Info */}
            <h1 className="text-xl font-bold text-gray-800">{userData.accountNumber}</h1>
            <p className="text-gray-600 mb-3">ID: {userData.id}</p>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
              {userData.vipChannel}
            </div>
          </div>

          {/* Balance Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-5 text-white mt-6 mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Total Balance (USDT)</span>
              <div className="flex space-x-2">
                <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition">
                  Withdraw
                </button>
                <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-medium transition">
                  Deposit
                </button>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-6">{userData.balance.toFixed(2)}</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={<FiTrendingUp className="text-blue-200" />} label="Yesterday" value={userData.yesterdayEarnings} />
              <StatCard icon={<FiClock className="text-purple-200" />} label="Pending" value={userData.pendingFunds} />
              <StatCard icon={<FiPieChart className="text-blue-200" />} label="Total Earned" value={userData.totalEarnings} />
              <StatCard icon={<FiDollarSign className="text-purple-200" />} label="Available" value={userData.availableFunds} />
            </div>
          </div>

          {/* Social Stats */}
          <div className="flex justify-around text-center border-t border-gray-100 pt-4">
            <SocialStat icon={<FiUser className="text-blue-500" />} count={userData.connections} label="Connections" />
            <SocialStat icon={<FiUsers className="text-purple-500" />} count={userData.teamMembers} label="Team" />
            <SocialStat icon={<FiMessageSquare className="text-indigo-500" />} count={userData.comments} label="Comments" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <TabButton 
            icon={<FiCreditCard className="text-gray-600" />}
            label="Order Record"
            active={activeTab === 'order-record'}
            onClick={() => setActiveTab('order-record')}
          />
          <TabButton 
            icon={<FiDollarSign className="text-gray-600" />}
            label="Asset Details"
            active={activeTab === 'asset-details'}
            onClick={() => setActiveTab('asset-details')}
          />
          <TabButton 
            icon={<FiSettings className="text-gray-600" />}
            label="Change Email"
            active={activeTab === 'change-email'}
            onClick={() => setActiveTab('change-email')}
          />
          <TabButton 
            icon={<FiLock className="text-gray-600" />}
            label="Login Password"
            active={activeTab === 'login-password'}
            onClick={() => setActiveTab('login-password')}
          />
          <TabButton 
            icon={<FiKey className="text-gray-600" />}
            label="Withdrawal Password"
            active={activeTab === 'withdrawal-password'}
            onClick={() => setActiveTab('withdrawal-password')}
          />
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Logout Button */}
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full flex items-center justify-center py-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition mt-6 border border-red-100 shadow-sm"
        >
          <FiLogOut className="mr-2" />
          <span className="font-medium">Logout</span>
        </button>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full animate-fade-in">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to log out of your account?</p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="bg-white/10 p-2.5 rounded-lg backdrop-blur-sm">
    <div className="flex items-center text-xs mb-1">
      <span className="mr-1.5">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
    <span className="font-bold text-sm">{value.toFixed(2)}</span>
  </div>
);

const SocialStat = ({ icon, count, label }: { icon: React.ReactNode; count: number; label: string }) => (
  <div className="px-2 py-1">
    <div className="flex items-center justify-center mb-1">
      {icon}
      <span className="ml-1.5 text-sm font-medium text-gray-800">{count}</span>
    </div>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

const TabButton = ({ icon, label, active, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 text-left border-b border-gray-100 last:border-0 transition ${
      active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
    }`}
  >
    <div className="flex items-center">
      <span className={`mr-3 ${active ? 'text-blue-500' : 'text-gray-500'}`}>{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
    <FiChevronRight className={`${active ? 'text-blue-500' : 'text-gray-400'}`} />
  </button>
);

const AssetDetailCard = ({ icon, label, value, bgColor }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  bgColor: string;
}) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <div className="flex items-center mb-2">
      <div className="p-2 rounded-full bg-white shadow-sm mr-3">
        {icon}
      </div>
      <h4 className="font-medium text-gray-800">{label}</h4>
    </div>
    <p className="text-xl font-bold text-gray-900">{value}</p>
  </div>
);

export default ProfilePage;