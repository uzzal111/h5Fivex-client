// app/(wallet)/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiDollarSign, FiArrowUp, FiArrowDown, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  description?: string;
};

export default function WalletHome() {
  const [balance, setBalance] = useState<number>(1500.75);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'deposit' | 'withdrawal'>('all');

  // Initialize with sample transactions
  useEffect(() => {
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        type: 'deposit',
        amount: 500,
        date: new Date('2023-05-15'),
        status: 'completed',
        description: 'Bank Transfer'
      },
      {
        id: '2',
        type: 'withdrawal',
        amount: 200,
        date: new Date('2023-05-10'),
        status: 'completed',
        description: 'Shopping'
      },
      // ... more sample transactions
    ];
    setTransactions(sampleTransactions);
  }, []);

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.type === filter
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
          <p className="text-gray-600">Manage your finances easily</p>
        </header>

        {/* Balance Card */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Current Balance</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-1">
                ${balance.toFixed(2)}
              </h2>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <FiDollarSign className="text-2xl" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link 
              href="/deposit"
              className="flex-1 bg-white/20 hover:bg-white/30 transition py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>Deposit</span>
              <FiArrowUp />
            </Link>
            <Link 
              href="/withdraw"
              className="flex-1 bg-white/20 hover:bg-white/30 transition py-3 rounded-lg flex items-center justify-center space-x-2"
            >
              <span>Withdraw</span>
              <FiArrowDown />
            </Link>
          </div>
        </motion.div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiClock className="mr-2 text-indigo-500" />
                Transaction History
              </h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full ${filter === 'all' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('deposit')}
                  className={`px-3 py-1 text-sm rounded-full ${filter === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  Deposits
                </button>
                <button 
                  onClick={() => setFilter('withdrawal')}
                  className={`px-3 py-1 text-sm rounded-full ${filter === 'withdrawal' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'}`}
                >
                  Withdrawals
                </button>
              </div>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No transactions found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredTransactions.map((tx) => (
                <li key={tx.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${tx.type === 'deposit' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                        {tx.type === 'deposit' ? <FiArrowUp /> : <FiArrowDown />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {tx.description || (tx.type === 'deposit' ? 'Deposit' : 'Withdrawal')}
                        </p>
                        <p className="text-sm text-gray-500">{formatDate(tx.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${tx.type === 'deposit' ? 'text-green-600' : 'text-amber-600'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === 'completed' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}