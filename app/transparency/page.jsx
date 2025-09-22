'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  FileText, 
  Download, 
  Calendar,
  PieChart,
  BarChart3,
  Eye,
  Shield,
  CheckCircle
} from 'lucide-react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import AnimatedCounter from '@/components/UI/AnimatedCounter'

export default function TransparencyPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024')
  const [activeTab, setActiveTab] = useState('overview')

  // Sample financial data
  const financialData = {
    '2024': {
      totalDonations: 15678450,
      totalDistributed: 14234567,
      adminCosts: 1443883,
      beneficiaries: 2547,
      monthlyData: [
        { month: 'Jan', donations: 1200000, distributions: 1100000 },
        { month: 'Feb', donations: 1350000, distributions: 1250000 },
        { month: 'Mar', donations: 1450000, distributions: 1300000 },
        { month: 'Apr', donations: 1300000, distributions: 1200000 },
        { month: 'May', donations: 1500000, distributions: 1350000 },
        { month: 'Jun', donations: 1600000, distributions: 1450000 },
        { month: 'Jul', donations: 1400000, distributions: 1300000 },
        { month: 'Aug', donations: 1550000, distributions: 1400000 },
        { month: 'Sep', donations: 1650000, distributions: 1500000 },
        { month: 'Oct', donations: 1750000, distributions: 1600000 },
        { month: 'Nov', donations: 1800000, distributions: 1650000 },
        { month: 'Dec', donations: 1122450, distributions: 1134567 }
      ]
    },
    '2023': {
      totalDonations: 12456789,
      totalDistributed: 11234567,
      adminCosts: 1222222,
      beneficiaries: 1987,
      monthlyData: [
        { month: 'Jan', donations: 800000, distributions: 750000 },
        { month: 'Feb', donations: 900000, distributions: 850000 },
        { month: 'Mar', donations: 950000, distributions: 900000 },
        { month: 'Apr', donations: 1000000, distributions: 950000 },
        { month: 'May', donations: 1100000, distributions: 1000000 },
        { month: 'Jun', donations: 1200000, distributions: 1100000 },
        { month: 'Jul', donations: 1150000, distributions: 1050000 },
        { month: 'Aug', donations: 1250000, distributions: 1150000 },
        { month: 'Sep', donations: 1300000, distributions: 1200000 },
        { month: 'Oct', donations: 1350000, distributions: 1250000 },
        { month: 'Nov', donations: 1400000, distributions: 1300000 },
        { month: 'Dec', donations: 1051789, distributions: 1029567 }
      ]
    }
  }

  const currentData = financialData[selectedPeriod]

  const expenseBreakdown = [
    { category: 'Direct Beneficiary Support', amount: currentData.totalDistributed * 0.75, percentage: 75, color: '#5DADE2' },
    { category: 'Program Operations', amount: currentData.totalDistributed * 0.15, percentage: 15, color: '#FFC857' },
    { category: 'Skills Training Materials', amount: currentData.totalDistributed * 0.10, percentage: 10, color: '#10B981' }
  ]

  const adminBreakdown = [
    { category: 'Staff Salaries', amount: currentData.adminCosts * 0.60, percentage: 60, color: '#8B5CF6' },
    { category: 'Office & Utilities', amount: currentData.adminCosts * 0.25, percentage: 25, color: '#F59E0B' },
    { category: 'Technology & Systems', amount: currentData.adminCosts * 0.15, percentage: 15, color: '#EF4444' }
  ]

  const recentTransactions = [
    { date: '2024-11-15', type: 'Donation', amount: 50000, donor: 'Anonymous', method: 'Paystack' },
    { date: '2024-11-14', type: 'Distribution', amount: -25000, recipient: 'Lagos Community Kitchen', method: 'Bank Transfer' },
    { date: '2024-11-13', type: 'Donation', amount: 100000, donor: 'Corporate Partner', method: 'Bank Transfer' },
    { date: '2024-11-12', type: 'Distribution', amount: -15000, recipient: 'Skills Training Program', method: 'Cash' },
    { date: '2024-11-11', type: 'Donation', amount: 75000, donor: 'Individual Donor', method: 'Crypto' },
  ]

  const certifications = [
    {
      title: 'CAC Registration',
      description: 'Officially registered with Corporate Affairs Commission',
      status: 'Valid',
      date: '2020-03-15',
      icon: Shield
    },
    {
      title: 'Tax Exemption Certificate',
      description: 'Approved for tax-exempt status by FIRS',
      status: 'Valid',
      date: '2020-06-20',
      icon: FileText
    },
    {
      title: 'NGO Regulatory Compliance',
      description: 'Compliant with all NGO regulatory requirements',
      status: 'Valid',
      date: '2024-01-10',
      icon: CheckCircle
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FFF3E1] to-[#FFC857]/20 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#5DADE2] p-3 rounded-full mr-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800">
                <span className="text-[#5DADE2]">Transparency</span> Report
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe in complete transparency. See exactly how your donations are used, 
              track our impact, and access all our financial records and reports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Period Selector */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Reporting Period:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-[#5DADE2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'financial', label: 'Financial Details', icon: DollarSign },
              { id: 'impact', label: 'Impact Metrics', icon: Users },
              { id: 'compliance', label: 'Compliance', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#5DADE2] text-[#5DADE2]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center">
                      <div className="bg-[#5DADE2]/10 p-3 rounded-full">
                        <DollarSign className="h-6 w-6 text-[#5DADE2]" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Donations</p>
                        <AnimatedCounter 
                          end={currentData.totalDonations} 
                          prefix="₦" 
                          className="text-2xl font-bold text-gray-900" 
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Distributed</p>
                        <AnimatedCounter 
                          end={currentData.totalDistributed} 
                          prefix="₦" 
                          className="text-2xl font-bold text-gray-900" 
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center">
                      <div className="bg-[#FFC857]/20 p-3 rounded-full">
                        <Users className="h-6 w-6 text-[#FFC857]" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Beneficiaries</p>
                        <AnimatedCounter 
                          end={currentData.beneficiaries} 
                          className="text-2xl font-bold text-gray-900" 
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <PieChart className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Efficiency Rate</p>
                        <AnimatedCounter 
                          end={Math.round((currentData.totalDistributed / currentData.totalDonations) * 100)} 
                          suffix="%" 
                          className="text-2xl font-bold text-gray-900" 
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Monthly Trend Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Donations vs Distributions</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {currentData.monthlyData.map((month, index) => (
                      <div key={month.month} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex flex-col space-y-1">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(month.donations / 2000000) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="bg-[#5DADE2] rounded-t"
                            style={{ minHeight: '4px' }}
                          />
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(month.distributions / 2000000) * 100}%` }}
                            transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                            className="bg-[#FFC857] rounded-t"
                            style={{ minHeight: '4px' }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#5DADE2] rounded"></div>
                      <span className="text-sm text-gray-600">Donations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-[#FFC857] rounded"></div>
                      <span className="text-sm text-gray-600">Distributions</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div className="space-y-8">
                {/* Expense Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Program Expenses</h3>
                    <div className="space-y-4">
                      {expenseBreakdown.map((expense, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: expense.color }}
                            />
                            <span className="text-sm text-gray-700">{expense.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              ₦{expense.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">{expense.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">Administrative Costs</h3>
                    <div className="space-y-4">
                      {adminBreakdown.map((admin, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: admin.color }}
                            />
                            <span className="text-sm text-gray-700">{admin.category}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              ₦{admin.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">{admin.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Method
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentTransactions.map((transaction, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(transaction.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                transaction.type === 'Donation' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                                ₦{Math.abs(transaction.amount).toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.donor || transaction.recipient}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.method}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="bg-[#5DADE2]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-[#5DADE2]" />
                    </div>
                    <AnimatedCounter end={48692} className="text-3xl font-bold text-gray-900 mb-2" />
                    <p className="text-gray-600">Meals Provided</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="bg-[#FFC857]/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-[#FFC857]" />
                    </div>
                    <AnimatedCounter end={389} className="text-3xl font-bold text-gray-900 mb-2" />
                    <p className="text-gray-600">Skills Trained</p>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6 text-center">
                    <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-green-600" />
                    </div>
                    <AnimatedCounter end={127} className="text-3xl font-bold text-gray-900 mb-2" />
                    <p className="text-gray-600">Businesses Started</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Impact by State</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { state: 'Lagos', beneficiaries: 567, percentage: 22 },
                      { state: 'Kano', beneficiaries: 423, percentage: 17 },
                      { state: 'Rivers', beneficiaries: 389, percentage: 15 },
                      { state: 'Ogun', beneficiaries: 312, percentage: 12 },
                      { state: 'Enugu', beneficiaries: 298, percentage: 12 },
                      { state: 'Others', beneficiaries: 558, percentage: 22 }
                    ].map((state, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{state.state}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{state.beneficiaries}</div>
                          <div className="text-xs text-gray-500">{state.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-lg shadow p-6"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                          <cert.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{cert.title}</h3>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {cert.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{cert.description}</p>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(cert.date).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Audit Reports</h3>
                  <div className="space-y-4">
                    {[
                      { year: '2024', status: 'In Progress', auditor: 'PwC Nigeria', date: 'Expected Q1 2025' },
                      { year: '2023', status: 'Completed', auditor: 'KPMG Nigeria', date: 'March 2024' },
                      { year: '2022', status: 'Completed', auditor: 'EY Nigeria', date: 'February 2023' }
                    ].map((audit, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{audit.year} Annual Audit</h4>
                          <p className="text-sm text-gray-600">Auditor: {audit.auditor}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            audit.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {audit.status}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">{audit.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}