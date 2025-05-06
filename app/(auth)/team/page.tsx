'use client';

import React, { useState } from 'react';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiPhone, 
  FiDollarSign, 
  FiUserCheck,
  FiUserX,
  FiUsers,
  FiActivity,
  FiPieChart,
  FiUser,
  FiFilter
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  phone: string;
  level: number;
  status: 'active' | 'inactive';
  deposit: number;
  withdrawal: number;
  commission: number;
  joinDate: string;
  children?: TeamMember[];
}

interface StatsByLevel {
  [level: number]: {
    total: number;
    active: number;
    inactive: number;
    deposit: number;
    withdrawal: number;
    commission: number;
  };
}

export default function TeamDashboard() {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([1]);
  const [expandedMembers, setExpandedMembers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Sample data
  const teamData: TeamMember = {
    id: '0',
    name: 'You (Owner)',
    phone: '017XXXXXXXX',
    level: 0,
    status: 'active',
    deposit: 25000,
    withdrawal: 8000,
    commission: 4500,
    joinDate: '2023-01-15',
    children: [
      {
        id: '1-1',
        name: 'John Smith',
        phone: '01711111111',
        level: 1,
        status: 'active',
        deposit: 12000,
        withdrawal: 4000,
        commission: 1800,
        joinDate: '2023-02-10',
        children: [
          {
            id: '2-1',
            name: 'Alice Johnson',
            phone: '01722222222',
            level: 2,
            status: 'active',
            deposit: 8000,
            withdrawal: 2500,
            commission: 1200,
            joinDate: '2023-03-05',
            children: [
              {
                id: '3-1',
                name: 'Michael Brown',
                phone: '01733333333',
                level: 3,
                status: 'active',
                deposit: 5000,
                withdrawal: 1500,
                commission: 750,
                joinDate: '2023-04-01'
              }
            ]
          },
          {
            id: '2-2',
            name: 'Bob Williams',
            phone: '01744444444',
            level: 2,
            status: 'inactive',
            deposit: 3000,
            withdrawal: 800,
            commission: 450,
            joinDate: '2023-03-12'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Sarah Davis',
        phone: '01755555555',
        level: 1,
        status: 'inactive',
        deposit: 6000,
        withdrawal: 2000,
        commission: 900,
        joinDate: '2023-02-18'
      }
    ]
  };

  // Calculate all statistics
  const calculateStats = (member: TeamMember) => {
    let stats = {
      totalMembers: 1,
      activeMembers: member.status === 'active' ? 1 : 0,
      inactiveMembers: member.status === 'inactive' ? 1 : 0,
      totalDeposit: member.deposit,
      activeDeposit: member.status === 'active' ? member.deposit : 0,
      totalWithdrawal: member.withdrawal,
      totalCommission: member.commission,
      byLevel: {
        1: { total: 0, active: 0, inactive: 0, deposit: 0, withdrawal: 0, commission: 0 },
        2: { total: 0, active: 0, inactive: 0, deposit: 0, withdrawal: 0, commission: 0 },
        3: { total: 0, active: 0, inactive: 0, deposit: 0, withdrawal: 0, commission: 0 }
      } as StatsByLevel // Explicitly cast to StatsByLevel type
    };

    if (member.children) {
      member.children.forEach(child => {
        const childStats = calculateStats(child);
        stats.totalMembers += childStats.totalMembers;
        stats.activeMembers += childStats.activeMembers;
        stats.inactiveMembers += childStats.inactiveMembers;
        stats.totalDeposit += childStats.totalDeposit;
        stats.activeDeposit += childStats.activeDeposit;
        stats.totalWithdrawal += childStats.totalWithdrawal;
        stats.totalCommission += childStats.totalCommission;

        // Aggregate by level
        for (let level in childStats.byLevel) {
          stats.byLevel[Number(level)].total += childStats.byLevel[Number(level)].total;
          stats.byLevel[Number(level)].active += childStats.byLevel[Number(level)].active;
          stats.byLevel[Number(level)].inactive += childStats.byLevel[Number(level)].inactive;
          stats.byLevel[Number(level)].deposit += childStats.byLevel[Number(level)].deposit;
          stats.byLevel[Number(level)].withdrawal += childStats.byLevel[Number(level)].withdrawal;
          stats.byLevel[Number(level)].commission += childStats.byLevel[Number(level)].commission;
        }

        // Count current member in their level
        if (child.level > 0) {
          stats.byLevel[child.level].total += 1;
          stats.byLevel[child.level].deposit += child.deposit;
          stats.byLevel[child.level].withdrawal += child.withdrawal;
          stats.byLevel[child.level].commission += child.commission;
          
          if (child.status === 'active') {
            stats.byLevel[child.level].active += 1;
          } else {
            stats.byLevel[child.level].inactive += 1;
          }
        }
      });
    }

    return stats;
  };

  const {
    totalMembers,
    activeMembers,
    inactiveMembers,
    totalDeposit,
    activeDeposit,
    totalWithdrawal,
    totalCommission,
    byLevel
  } = calculateStats(teamData);

  const toggleLevel = (level: number) => {
    if (expandedLevels.includes(level)) {
      setExpandedLevels(expandedLevels.filter(l => l !== level));
    } else {
      setExpandedLevels([...expandedLevels, level]);
    }
  };

  const toggleMember = (id: string) => {
    if (expandedMembers.includes(id)) {
      setExpandedMembers(expandedMembers.filter(memberId => memberId !== id));
    } else {
      setExpandedMembers([...expandedMembers, id]);
    }
  };

  const renderMember = (member: TeamMember, depth: number = 0) => {
    // Skip if filtered by status and doesn't match
    if (statusFilter !== 'all' && member.status !== statusFilter && member.level > 0) {
      return null;
    }

    const isExpanded = expandedMembers.includes(member.id);
    const hasChildren = member.children && member.children.length > 0;
    const levelColors = [
      'from-blue-50 to-blue-100 border-blue-200', // Level 0 (You)
      'from-purple-50 to-purple-100 border-purple-200', // Level 1
      'from-green-50 to-green-100 border-green-200', // Level 2
      'from-amber-50 to-amber-100 border-amber-200' // Level 3
    ];

    return (
      <div key={member.id} className="mb-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`p-4 rounded-lg shadow-sm border bg-gradient-to-r ${levelColors[member.level]}`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className={`p-2 rounded-full ${
                member.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {member.status === 'active' ? <FiUserCheck /> : <FiUserX />}
              </div>
              <div className="min-w-0">
                <div className="flex items-center">
                  <h3 className="font-medium truncate">{member.name}</h3>
                  {member.level > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/80 text-gray-600">
                      Level {member.level}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 flex items-center truncate">
                  <FiPhone className="mr-1 min-w-[16px]" /> 
                  {member.phone}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              <div className="text-center min-w-[70px]">
                <p className="text-xs text-gray-500">Deposit</p>
                <p className="font-semibold text-blue-600 flex items-center justify-center">
                  <FiDollarSign className="mr-1" /> {member.deposit.toLocaleString()}
                </p>
              </div>
              
              <div className="text-center min-w-[70px]">
                <p className="text-xs text-gray-500">Withdrawal</p>
                <p className="font-semibold text-green-600 flex items-center justify-center">
                  <FiDollarSign className="mr-1" /> {member.withdrawal.toLocaleString()}
                </p>
              </div>

              {member.level > 0 && (
                <div className="text-center min-w-[70px]">
                  <p className="text-xs text-gray-500">Commission</p>
                  <p className="font-semibold text-purple-600 flex items-center justify-center">
                    <FiDollarSign className="mr-1" /> {member.commission.toLocaleString()}
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center min-w-[30px]">
                <button 
                  onClick={() => toggleMember(member.id)}
                  className="p-2 rounded-full hover:bg-white/50 transition"
                  disabled={!hasChildren}
                >
                  {hasChildren ? (
                    isExpanded ? <FiChevronUp /> : <FiChevronDown />
                  ) : null}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="ml-4 md:ml-8 mt-2 pl-4 border-l-2 border-gray-200"
          >
            {member.children?.map(child => renderMember(child, depth + 1))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FiUsers className="mr-2 text-blue-500" />
          Team Performance Dashboard
        </h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Team Members</h3>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{totalMembers}</p>
              </div>
              <div className="flex space-x-1">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <FiUserCheck className="mr-1" /> {activeMembers}
                </span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center">
                  <FiUserX className="mr-1" /> {inactiveMembers}
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-gray-500">Level 1</p>
                <p className="font-medium">{byLevel[1].total}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Level 2</p>
                <p className="font-medium">{byLevel[2].total}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">Level 3</p>
                <p className="font-medium">{byLevel[3].total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow border border-purple-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Team Deposits</h3>
            <div className="flex items-end justify-between">
              <p className="text-xl md:text-2xl font-bold text-purple-600">
                <FiDollarSign className="inline mr-1" /> {totalDeposit.toLocaleString()}
              </p>
              <p className="text-sm text-green-600">
                <FiUserCheck className="inline mr-1" /> {activeDeposit.toLocaleString()} active
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-gray-500">L1 Deposit</p>
                <p className="font-medium">{byLevel[1].deposit.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">L2 Deposit</p>
                <p className="font-medium">{byLevel[2].deposit.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">L3 Deposit</p>
                <p className="font-medium">{byLevel[3].deposit.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Own Account</h3>
                <p className="text-xl md:text-2xl font-bold text-green-600">
                  <FiDollarSign className="inline mr-1" /> {teamData.deposit.toLocaleString()}
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <span className="text-green-600">{teamData.withdrawal.toLocaleString()}</span> withdrawn
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-gray-500">Earned Commission</p>
              <p className="text-lg font-bold text-amber-600">
                <FiDollarSign className="inline mr-1" /> {totalCommission.toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow border border-amber-100">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Team Withdrawals</h3>
            <p className="text-xl md:text-2xl font-bold text-amber-600">
              <FiDollarSign className="inline mr-1" /> {totalWithdrawal.toLocaleString()}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-gray-500">L1 Withdrawal</p>
                <p className="font-medium">{byLevel[1].withdrawal.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">L2 Withdrawal</p>
                <p className="font-medium">{byLevel[2].withdrawal.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500">L3 Withdrawal</p>
                <p className="font-medium">{byLevel[3].withdrawal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex space-x-2">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition ${
                  expandedLevels.includes(level)
                    ? level === 1 ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : level === 2 ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiActivity className="mr-2" />
                Level {level}
                <span className="ml-2 bg-white px-2 py-0.5 rounded-full text-xs">
                  {byLevel[level].total}
                </span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 bg-white rounded-full border border-gray-200 px-3 py-1">
            <FiFilter className="text-gray-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-sm outline-none appearance-none pr-5"
            >
              <option value="all">All Members</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
        
        {/* Team Members List */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 font-medium text-sm text-gray-600">
            <div className="col-span-5">Member Information</div>
            <div className="col-span-2 text-center">Deposit</div>
            <div className="col-span-2 text-center">Withdrawal</div>
            <div className="col-span-2 text-center">Commission</div>
            <div className="col-span-1"></div>
          </div>
          
          {/* Your Account */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <FiUser className="mr-2 text-blue-500" />
              Your Account
            </h3>
            {renderMember(teamData)}
          </div>
          
          {/* Team Members */}
          <AnimatePresence>
            {[1, 2, 3].map(level => (
              expandedLevels.includes(level) && (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <FiUsers className="mr-2" />
                    Level {level} Members ({byLevel[level].total})
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {byLevel[level].active} active / {byLevel[level].inactive} inactive
                    </span>
                  </h3>
                  
                  {teamData.children?.flatMap(member => 
                    member.level === level 
                      ? [renderMember(member)] 
                      : member.children?.filter(child => child.level === level).map(child => renderMember(child)) || []
                  )}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
