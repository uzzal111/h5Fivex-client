'use client';

import { useState } from 'react';
import { FiArrowUp, FiCopy, FiCheck, FiClock, FiInfo, FiGift } from 'react-icons/fi';
import Link from 'next/link';

export default function DepositPage() {
  const [txId, setTxId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [depositAmount, setDepositAmount] = useState<number>(0);

  const walletAddress = 'TNPdZ4pJcG9WJfVZ8Jk7vL5mRtNxY8zX9B';
  const network = 'TRC20';
  const minDeposit = 30;
  const qrCodeImage = '/images/deposit-qr-code.png';

  const depositHistory = [
    { id: '1', amount: 50, status: 'Completed', date: '2023-06-15 14:30', txId: '0x123...456' },
    { id: '2', amount: 100, status: 'Pending', date: '2023-06-14 09:15', txId: '0x789...012' },
  ];

  // Calculate 5% bonus for deposits over $100
  const calculateBonus = (amount: number) => {
    return amount > 100 ? amount * 0.05 : 0;
  };

  const bonus = calculateBonus(depositAmount);
  const totalAmount = depositAmount + bonus;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txId) {
      alert('Please enter your Transaction ID');
      return;
    }
    if (depositAmount < minDeposit) {
      alert(`Minimum deposit is $${minDeposit}`);
      return;
    }
    
    alert(`Deposit submitted!\nAmount: $${depositAmount}\nBonus: $${bonus.toFixed(2)}\nTotal: $${totalAmount.toFixed(2)}\nTX ID: ${txId}`);
    setTxId('');
    setDepositAmount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <Link href="/asset" className="inline-flex items-center text-sm text-white/80 hover:text-white mb-2">
                  <FiArrowUp className="rotate-90 mr-1" /> Back to Wallet
                </Link>
                <h1 className="text-2xl font-bold">Deposit USDT ({network})</h1>
                <p className="text-white/90 mt-1">Minimum deposit: ${minDeposit}</p>
              </div>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
              >
                <FiClock />
              </button>
            </div>
          </div>

          {/* Transaction History Panel */}
          {showHistory && (
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <FiClock className="mr-2 text-indigo-500" /> Deposit History
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {depositHistory.map(deposit => (
                  <div key={deposit.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">${deposit.amount}</p>
                        <p className="text-xs text-gray-500">{deposit.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          deposit.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {deposit.status}
                        </span>
                        <p className="text-xs text-gray-500 truncate max-w-[120px]">{deposit.txId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6">
            {/* QR Code Section */}
            <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-center border border-indigo-100">
              <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src={qrCodeImage} 
                  alt="Deposit QR Code" 
                  className="w-full h-full object-contain rounded-md shadow-inner"
                />
              </div>
              <p className="text-sm text-indigo-700 font-medium">Scan this QR code to deposit</p>
            </div>

            {/* Wallet Address */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Your {network} Deposit Address
              </label>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-100 transition">
                <p className="text-sm font-mono truncate">{walletAddress}</p>
                <button 
                  onClick={handleCopy}
                  className="text-indigo-600 hover:text-indigo-800 ml-2 p-1.5 rounded-full hover:bg-indigo-50 transition"
                  title="Copy to clipboard"
                >
                  {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-start">
                <FiInfo className="mr-1.5 mt-0.5 flex-shrink-0" />
                <span>Only send {network} USDT to this address. Sending other assets may result in permanent loss.</span>
              </p>
            </div>

            {/* Transaction Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Deposit Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposit Amount (USDT)
                </label>
                <input
                  type="number"
                  value={depositAmount || ''}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  placeholder={`Minimum $${minDeposit}`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white hover:border-indigo-300 transition"
                  min={minDeposit}
                  step="0.01"
                />
              </div>

              {/* Bonus Display */}
              {depositAmount > 100 && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center">
                  <FiGift className="text-green-500 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      You'll receive a 5% bonus!
                    </p>
                    <p className="text-xs text-green-600">
                      +${bonus.toFixed(2)} bonus (Total: ${totalAmount.toFixed(2)})
                    </p>
                  </div>
                </div>
              )}

              {/* Transaction ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Hash (TXID)
                </label>
                <input
                  type="text"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="Paste your transaction hash here"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white hover:border-indigo-300 transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-2 flex items-start">
                  <FiInfo className="mr-1.5 mt-0.5 flex-shrink-0" />
                  <span>Find this TXID in your wallet's transaction history after sending USDT</span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!txId || depositAmount < minDeposit}
                className={`w-full py-3.5 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg ${
                  (!txId || depositAmount < minDeposit) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Confirm Deposit
              </button>
            </form>

            {/* Important Notes */}
            <div className="mt-6 p-4 bg-amber-50/80 rounded-lg border border-amber-100">
              <h4 className="text-sm font-medium text-amber-800 flex items-center mb-2">
                <FiInfo className="mr-2 flex-shrink-0" /> Important Information
              </h4>
              <ul className="text-xs text-amber-700 space-y-1.5">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                  <span>Minimum deposit: <span className="font-semibold">${minDeposit} USDT</span></span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                  <span>Get <span className="font-semibold">5% bonus</span> for deposits over $100</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                  <span>Network: <span className="font-semibold">{network}</span> (DO NOT use other networks)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-1.5 mt-0.5">•</span>
                  <span>Processing time: <span className="font-semibold">1-3 network confirmations</span></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card Footer */}
        </div>
      </div>
    </div>
  );
}