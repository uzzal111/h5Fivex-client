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
  FiUser,
  FiFilter,
  FiCreditCard,
  FiTrendingUp,
  FiTrendingDown,
  FiAward
} from 'react-icons/fi';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: number;
  status: 'active' | 'inactive';
  deposit: number;
  withdrawal: number;
  commission: number;
  joinDate: string;
  sponsorId: string;
}

interface LevelStats {
  total: number;
  active: number;
  inactive: number;
  deposit: number;
  activeDeposit: number;
  withdrawal: number;
  commission: number;
}

interface TeamData {
  direct: number;
  team: number;
  teamDeposits: number;
  activeTeamDeposits: number;
  teamWithdrawals: number;
  teamCommission: number;
  ownAccount: {
    deposit: number;
    withdrawal: number;
  };
  members: TeamMember[];
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'blue' | 'purple' | 'green' | 'red';
}> = ({ icon, title, value, subtitle = '', color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200'
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`p-3 rounded-lg shadow-sm border ${colors[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium">{title}</p>
          <p className="text-xl sm:text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-80">{subtitle}</p>}
        </div>
        <div className="p-1 sm:p-2 rounded-full bg-white/50">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const LevelStatItem: React.FC<{ level: number; stats: LevelStats }> = ({ level, stats }) => {
  const levelColors = [
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-amber-100 text-amber-800'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelColors[level-1]}`}>
          Level {level}
        </span>
        <span className="text-xs sm:text-sm font-medium">
          {stats.total} members ({stats.active} active / {stats.inactive} inactive)
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-gray-50 p-1 sm:p-2 rounded">
          <p className="text-gray-500">Deposit</p>
          <p className="font-medium">${stats.deposit.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-1 sm:p-2 rounded">
          <p className="text-gray-500">Withdrawal</p>
          <p className="font-medium">${stats.withdrawal.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-1 sm:p-2 rounded">
          <p className="text-gray-500">Commission</p>
          <p className="font-medium">${stats.commission.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 p-1 sm:p-2 rounded">
          <p className="text-gray-500">Active Deposit</p>
          <p className="font-medium">${stats.activeDeposit.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

const FinancialStatItem: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode;
}> = ({ title, value, icon }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-2 p-1 sm:p-2 rounded-full bg-gray-100">
          {icon}
        </div>
        <span className="text-xs sm:text-sm font-medium text-gray-700">{title}</span>
      </div>
      <span className="text-sm sm:text-base font-medium">{value}</span>
    </div>
  );
};

const CommissionItem: React.FC<{ level: number; value: number }> = ({ level, value }) => {
  const levelColors = [
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-amber-100 text-amber-800'
  ];

  return (
    <div className="flex justify-between items-center">
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${levelColors[level-1]}`}>
        Level {level} Commission
      </span>
      <span className="font-medium">${value.toFixed(2)}</span>
    </div>
  );
};

const DetailItem: React.FC<{ 
  label: string; 
  value: string | React.ReactNode; 
  icon?: React.ReactNode;
}> = ({ label, value, icon }) => {
  return (
    <div className="flex items-start">
      {icon && (
        <div className="mr-2 mt-0.5 text-gray-500">
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <div className="font-medium text-sm">
          {typeof value === 'string' ? (
            <span className="break-all">{value}</span>
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
};

const MemberCard: React.FC<{ 
  member: TeamMember;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}> = ({ member, isExpanded, onToggle }) => {
  const statusColor = member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const levelColors = [
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-amber-100 text-amber-800'
  ];

  return (
    <motion.div 
      layout
      className={`border rounded-lg overflow-hidden ${isExpanded ? 'border-blue-300' : 'border-gray-200'}`}
    >
      <div 
        className={`p-3 sm:p-4 cursor-pointer ${isExpanded ? 'bg-blue-50' : 'bg-white'}`}
        onClick={() => onToggle(member.id)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0">
            <div className={`p-1.5 sm:p-2 rounded-full ${statusColor}`}>
              {member.status === 'active' ? <FiUserCheck size={16} /> : <FiUserX size={16} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h3 className="font-medium text-sm sm:text-base truncate">{member.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[member.level-1]} mt-1 sm:mt-0`}>
                  Level {member.level}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{member.email}</p>
              
              <div className="sm:hidden mt-1 grid grid-cols-2 gap-1 text-xs">
                <div>
                  <p className="text-gray-500">Deposit</p>
                  <p className="font-semibold text-blue-600">${member.deposit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Withdrawal</p>
                  <p className="font-semibold text-green-600">${member.withdrawal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center justify-end gap-3">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center min-w-[70px]">
                <p className="text-xs text-gray-500">Deposit</p>
                <p className="font-semibold text-blue-600">${member.deposit.toFixed(2)}</p>
              </div>
              <div className="text-center min-w-[70px]">
                <p className="text-xs text-gray-500">Withdrawal</p>
                <p className="font-semibold text-green-600">${member.withdrawal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-center">
                <button className="p-1 rounded-full hover:bg-gray-200">
                  {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="sm:hidden flex justify-end">
            <button 
              className="p-1 rounded-full hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(member.id);
              }}
            >
              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-50 p-3 sm:p-4 border-t"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <DetailItem label="Member ID" value={member.id} icon={<FiUser />} />
              <DetailItem label="Sponsor ID" value={member.sponsorId} icon={<FiUsers />} />
              <DetailItem label="Phone" value={member.phone} icon={<FiPhone />} />
              <DetailItem label="Joined Date" value={member.joinDate} icon={<FiActivity />} />
            </div>
            <div className="space-y-2">
              <DetailItem 
                label="Status" 
                value={
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </span>
                } 
                icon={member.status === 'active' ? <FiUserCheck /> : <FiUserX />}
              />
              <DetailItem label="Commission" value={`$${member.commission.toFixed(2)}`} icon={<FiDollarSign />} />
              <DetailItem label="Level" value={member.level} icon={<FiAward />} />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const TeamDashboard: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [levelFilter, setLevelFilter] = useState<number | null>(null);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  const teamData: TeamData = {
    direct: 5,
    team: 39,
    teamDeposits: 723.00,
    activeTeamDeposits: 650.00,
    teamWithdrawals: 3344.79,
    teamCommission: 1250.50,
    ownAccount: {
      deposit: 2500.00,
      withdrawal: 1500.00
    },
    members: [
      {
        id: '758881',
        name: 'Majedur Rahman',
        email: 'mdm*******@gmail.com',
        phone: '01712345678',
        level: 1,
        status: 'active',
        deposit: 500.00,
        withdrawal: 200.00,
        commission: 150.00,
        joinDate: '2025-01-01 20:31:28',
        sponsorId: '227429'
      },
      {
        id: '926999',
        name: 'Bahar Uddin',
        email: 'Ano********@gmail.com',
        phone: '01787654321',
        level: 1,
        status: 'inactive',
        deposit: 0.00,
        withdrawal: 0.00,
        commission: 0.00,
        joinDate: '2025-01-01 20:36:09',
        sponsorId: '227429'
      },
      {
        id: '403513',
        name: 'Md Ashek Mahmud',
        email: 'sop********@gmail.com',
        phone: '01755556666',
        level: 2,
        status: 'active',
        deposit: 200.00,
        withdrawal: 100.00,
        commission: 50.00,
        joinDate: '2025-01-01 20:36:44',
        sponsorId: '227429'
      }
    ]
  };

  const calculateStats = (): {
    level1: LevelStats;
    level2: LevelStats;
    level3: LevelStats;
    totalActive: number;
    totalInactive: number;
    totalDeposit: number;
    activeDeposit: number;
    totalWithdrawal: number;
    totalCommission: number;
  } => {
    const stats = {
      level1: { total: 0, active: 0, inactive: 0, deposit: 0, activeDeposit: 0, withdrawal: 0, commission: 0 },
      level2: { total: 0, active: 0, inactive: 0, deposit: 0, activeDeposit: 0, withdrawal: 0, commission: 0 },
      level3: { total: 0, active: 0, inactive: 0, deposit: 0, activeDeposit: 0, withdrawal: 0, commission: 0 },
      totalActive: 0,
      totalInactive: 0,
      totalDeposit: 0,
      activeDeposit: 0,
      totalWithdrawal: 0,
      totalCommission: 0
    };

    teamData.members.forEach(member => {
      if (member.status === 'active') {
        stats.totalActive++;
        stats.activeDeposit += member.deposit;
      } else {
        stats.totalInactive++;
      }

      stats.totalDeposit += member.deposit;
      stats.totalWithdrawal += member.withdrawal;
      stats.totalCommission += member.commission;

      if (member.level === 1) {
        stats.level1.total++;
        if (member.status === 'active') {
          stats.level1.active++;
          stats.level1.activeDeposit += member.deposit;
        } else {
          stats.level1.inactive++;
        }
        stats.level1.deposit += member.deposit;
        stats.level1.withdrawal += member.withdrawal;
        stats.level1.commission += member.commission;
      } else if (member.level === 2) {
        stats.level2.total++;
        if (member.status === 'active') {
          stats.level2.active++;
          stats.level2.activeDeposit += member.deposit;
        } else {
          stats.level2.inactive++;
        }
        stats.level2.deposit += member.deposit;
        stats.level2.withdrawal += member.withdrawal;
        stats.level2.commission += member.commission;
      } else if (member.level === 3) {
        stats.level3.total++;
        if (member.status === 'active') {
          stats.level3.active++;
          stats.level3.activeDeposit += member.deposit;
        } else {
          stats.level3.inactive++;
        }
        stats.level3.deposit += member.deposit;
        stats.level3.withdrawal += member.withdrawal;
        stats.level3.commission += member.commission;
      }
    });

    return stats;
  };

  const stats = calculateStats();

  const toggleMember = (id: string) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const filteredMembers = teamData.members.filter(member => {
    const statusMatch = statusFilter === 'all' || member.status === statusFilter;
    const levelMatch = levelFilter === null || member.level === levelFilter;
    return statusMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
          <FiUsers className="mr-2 text-blue-500" />
          Team Details
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <StatCard 
            icon={<FiUser className="text-blue-500" />} 
            title="Direct Members" 
            value={teamData.direct} 
            color="blue" 
          />
          <StatCard 
            icon={<FiUsers className="text-purple-500" />} 
            title="Team Members" 
            value={`${stats.totalActive} / ${stats.totalInactive}`} 
            subtitle={`Active / Inactive`}
            color="purple" 
          />
          <StatCard 
            icon={<FiTrendingUp className="text-green-500" />} 
            title="Team Deposits" 
            value={`$${teamData.teamDeposits.toFixed(2)}`} 
            subtitle={`Active: $${teamData.activeTeamDeposits.toFixed(2)}`}
            color="green" 
          />
          <StatCard 
            icon={<FiTrendingDown className="text-red-500" />} 
            title="Team Withdrawals" 
            value={`$${teamData.teamWithdrawals.toFixed(2)}`} 
            color="red" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <FiActivity className="mr-2 text-blue-500" />
              Level-wise Statistics
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <LevelStatItem level={1} stats={stats.level1} />
              <LevelStatItem level={2} stats={stats.level2} />
              <LevelStatItem level={3} stats={stats.level3} />
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <FiCreditCard className="mr-2 text-green-500" />
              Financial Overview
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <FinancialStatItem 
                title="Total Team Deposit" 
                value={`$${stats.totalDeposit.toFixed(2)}`} 
                icon={<FiTrendingUp className="text-green-500" />} 
              />
              <FinancialStatItem 
                title="Active Team Deposit" 
                value={`$${stats.activeDeposit.toFixed(2)}`} 
                icon={<FiTrendingUp className="text-blue-500" />} 
              />
              <FinancialStatItem 
                title="Total Team Withdrawal" 
                value={`$${stats.totalWithdrawal.toFixed(2)}`} 
                icon={<FiTrendingDown className="text-red-500" />} 
              />
              <FinancialStatItem 
                title="Own Account Deposit" 
                value={`$${teamData.ownAccount.deposit.toFixed(2)}`} 
                icon={<FiTrendingUp className="text-purple-500" />} 
              />
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <FiDollarSign className="mr-2 text-purple-500" />
              Commission Breakdown
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <CommissionItem level={1} value={stats.level1.commission} />
              <CommissionItem level={2} value={stats.level2.commission} />
              <CommissionItem level={3} value={stats.level3.commission} />
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base font-medium">Total Commission</span>
                  <span className="font-bold text-purple-600">
                    ${teamData.teamCommission.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex-1 flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200">
              <FiFilter className="text-gray-500 mr-2 min-w-[16px]" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                className="bg-transparent w-full text-xs sm:text-sm outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200">
              <FiFilter className="text-gray-500 mr-2 min-w-[16px]" />
              <select 
                value={levelFilter || ''}
                onChange={(e) => setLevelFilter(e.target.value ? parseInt(e.target.value) : null)}
                className="bg-transparent w-full text-xs sm:text-sm outline-none"
              >
                <option value="">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </select>
            </div>
          </div>
          <div className="sm:w-auto flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200">
            <span className="text-xs sm:text-sm text-gray-700">
              Showing: {filteredMembers.length} members
            </span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <FiUsers className="mr-2 text-blue-500" />
            Team Members ({filteredMembers.length})
            <span className="ml-2 text-xs text-gray-500 hidden sm:inline">
              {statusFilter === 'all' ? '' : `${statusFilter} `} 
              {levelFilter ? `Level ${levelFilter}` : ''}
            </span>
          </h3>

          {filteredMembers.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-gray-500">
              No members found matching your filters
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {filteredMembers.map(member => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  isExpanded={expandedMember === member.id}
                  onToggle={toggleMember}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;