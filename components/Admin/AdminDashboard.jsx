"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Utensils,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Plus,
  Eye,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import AnimatedCounter from "@/components/UI/AnimatedCounter";
import DailyDonationsManager from "./DailyDonationsManager";
import MonthlyEmpowermentManager from "./MonthlyEmpowermentManager";
import SuccessStoriesManager from "./SuccessStoriesManager";
import TransparencyManager from "./TransparencyManager";
// import FormGenerator from './FormGenerator'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalBeneficiaries: 0,
    mealsProvided: 0,
    skillsTraining: 0,
    fundsRaised: 0,
    monthlyGrowth: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load statistics
      const [donationsResult, empowermentResult, transactionsResult] =
        await Promise.all([
          supabase.from("daily_donations").select("amount, created_at"),
          supabase
            .from("monthly_empowerment")
            .select("approved_amount, created_at")
            .eq("status", "paid"),
          supabase
            .from("transactions")
            .select("amount, type, created_at")
            .eq("status", "completed"),
        ]);

      const donations = donationsResult.data || [];
      const empowerment = empowermentResult.data || [];
      const transactions = transactionsResult.data || [];

      const totalBeneficiaries = donations.length + empowerment.length;
      const mealsProvided = donations.reduce(
        (sum, d) => sum + parseFloat(d.amount) / 200,
        0
      ); // Assuming ₦200 per meal
      const skillsTraining = empowerment.length;
      const fundsRaised = transactions
        .filter((t) => t.type === "donation")
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      setStats({
        totalBeneficiaries,
        mealsProvided: Math.floor(mealsProvided),
        skillsTraining,
        fundsRaised,
        monthlyGrowth: 12.5, // Calculate actual growth
      });

      // Load recent activity
      const { data: recentData } = await supabase
        .from("daily_donations")
        .select("recipient_name, amount, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentActivity(recentData || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "daily-donations", label: "Daily Donations", icon: Utensils },
    { id: "empowerment", label: "Empowerment", icon: GraduationCap },
    { id: "success-stories", label: "Success Stories", icon: FileText },
    { id: "transparency", label: "Transparency", icon: Eye },
    { id: "forms", label: "Form Generator", icon: Plus },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      // case "daily-donations":
      //   return <DailyDonationsManager />;
      // case "empowerment":
      //   return <MonthlyEmpowermentManager />;
      // case "success-stories":
      //   return <SuccessStoriesManager />;
      // case "transparency":
      //   return <TransparencyManager />;
      // case "forms":
      //   return <FormGenerator />;
      // case "settings":
      //   return <AdminSettings />;
      default:
        return (
          <OverviewTab
            stats={stats}
            recentActivity={recentActivity}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-[#5DADE2] text-[#5DADE2]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ stats, recentActivity, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="bg-[#5DADE2]/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-[#5DADE2]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Beneficiaries
              </p>
              <AnimatedCounter
                end={stats.totalBeneficiaries}
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
            <div className="bg-[#FFC857]/20 p-3 rounded-full">
              <Utensils className="h-6 w-6 text-[#FFC857]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Meals Provided
              </p>
              <AnimatedCounter
                end={stats.mealsProvided}
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
            <div className="bg-green-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Skills Training
              </p>
              <AnimatedCounter
                end={stats.skillsTraining}
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
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Funds Raised</p>
              <AnimatedCounter
                end={stats.fundsRaised}
                prefix="₦"
                className="text-2xl font-bold text-gray-900"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Donations
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.recipient_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-[#5DADE2]">
                    ₦{parseFloat(activity.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full bg-[#5DADE2] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                Record New Donation
              </button>
              <button className="w-full bg-[#FFC857] text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors">
                Generate Form Link
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Add Success Story
              </button>
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                Upload Statement
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Settings Component
function AdminSettings() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Admin Settings</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            defaultValue="HopeHelps NGO"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            defaultValue="info@hopehelps.ng"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Meal Cost (₦)
          </label>
          <input
            type="number"
            defaultValue="200"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
          />
        </div>
        <button className="bg-[#5DADE2] text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
