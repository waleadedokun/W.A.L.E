'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Users, 
  Utensils, 
  GraduationCap, 
  Building, 
  Globe,
  Target,
  TrendingUp,
  Heart,
  Award
} from 'lucide-react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState(0)

  const roadmapData = [
    {
      phase: "Foundation Phase",
      period: "2020 - 2021",
      status: "completed",
      description: "Establishing core operations and building initial community trust",
      milestones: [
        {
          title: "NGO Registration & Legal Setup",
          description: "Official registration with CAC and obtaining necessary permits",
          status: "completed",
          icon: Building,
          date: "Q1 2020"
        },
        {
          title: "First Community Outreach",
          description: "Identified and began serving 3 communities in Lagos State",
          status: "completed",
          icon: Users,
          date: "Q2 2020"
        },
        {
          title: "Daily Meal Program Launch",
          description: "Started providing 50 meals daily to families in need",
          status: "completed",
          icon: Utensils,
          date: "Q3 2020"
        },
        {
          title: "First Skills Training Workshop",
          description: "Launched tailoring and baking workshops for 25 participants",
          status: "completed",
          icon: GraduationCap,
          date: "Q4 2020"
        }
      ]
    },
    {
      phase: "Growth Phase",
      period: "2022 - 2023",
      status: "completed",
      description: "Expanding reach and developing sustainable programs",
      milestones: [
        {
          title: "Multi-State Expansion",
          description: "Extended operations to 8 states across Nigeria",
          status: "completed",
          icon: Globe,
          date: "Q1 2022"
        },
        {
          title: "Digital Platform Launch",
          description: "Launched website and online donation system",
          status: "completed",
          icon: Globe,
          date: "Q2 2022"
        },
        {
          title: "Partnership Development",
          description: "Established partnerships with 15 local organizations",
          status: "completed",
          icon: Users,
          date: "Q3 2022"
        },
        {
          title: "1000+ Lives Impacted",
          description: "Reached milestone of serving over 1000 beneficiaries",
          status: "completed",
          icon: Heart,
          date: "Q4 2022"
        }
      ]
    },
    {
      phase: "Scale Phase",
      period: "2024 - 2025",
      status: "in-progress",
      description: "Scaling operations and enhancing program effectiveness",
      milestones: [
        {
          title: "Advanced Skills Programs",
          description: "Launch digital literacy and entrepreneurship programs",
          status: "completed",
          icon: GraduationCap,
          date: "Q1 2024"
        },
        {
          title: "Mobile Outreach Units",
          description: "Deploy mobile units for remote community access",
          status: "in-progress",
          icon: Users,
          date: "Q2 2024"
        },
        {
          title: "Transparency Dashboard",
          description: "Launch public transparency portal for real-time impact tracking",
          status: "in-progress",
          icon: TrendingUp,
          date: "Q3 2024"
        },
        {
          title: "5000+ Beneficiaries Target",
          description: "Reach 5000 total beneficiaries across all programs",
          status: "pending",
          icon: Target,
          date: "Q4 2024"
        }
      ]
    },
    {
      phase: "Innovation Phase",
      period: "2025 - 2026",
      status: "pending",
      description: "Implementing innovative solutions and sustainable models",
      milestones: [
        {
          title: "AI-Powered Impact Tracking",
          description: "Implement AI systems for better program optimization",
          status: "pending",
          icon: TrendingUp,
          date: "Q1 2025"
        },
        {
          title: "Microfinance Integration",
          description: "Launch microfinance program for graduated beneficiaries",
          status: "pending",
          icon: Building,
          date: "Q2 2025"
        },
        {
          title: "Regional Training Centers",
          description: "Establish permanent training centers in 5 regions",
          status: "pending",
          icon: Building,
          date: "Q3 2025"
        },
        {
          title: "International Recognition",
          description: "Achieve international NGO certification and recognition",
          status: "pending",
          icon: Award,
          date: "Q4 2025"
        }
      ]
    },
    {
      phase: "Sustainability Phase",
      period: "2026 - 2030",
      status: "pending",
      description: "Achieving long-term sustainability and maximum impact",
      milestones: [
        {
          title: "Self-Sustaining Communities",
          description: "Transform 50 communities to be self-sustaining",
          status: "pending",
          icon: Users,
          date: "2027"
        },
        {
          title: "National Policy Influence",
          description: "Influence national policies on poverty alleviation",
          status: "pending",
          icon: Building,
          date: "2028"
        },
        {
          title: "100,000 Lives Transformed",
          description: "Reach milestone of 100,000 lives positively impacted",
          status: "pending",
          icon: Heart,
          date: "2029"
        },
        {
          title: "Model Replication",
          description: "Enable replication of our model across West Africa",
          status: "pending",
          icon: Globe,
          date: "2030"
        }
      ]
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-[#FFC857]" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Our <span className="text-[#5DADE2]">Roadmap</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Follow our journey from a small community initiative to a nationwide movement 
              transforming lives across Nigeria. See where we've been and where we're heading.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey So Far</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track our progress through different phases of growth and impact
            </p>
          </motion.div>

          {/* Phase Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roadmapData.map((phase, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePhase(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activePhase === index
                    ? 'bg-[#5DADE2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {phase.phase}
              </motion.button>
            ))}
          </div>

          {/* Active Phase Details */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <h3 className="text-3xl font-bold text-gray-800">
                  {roadmapData[activePhase].phase}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getStatusColor(roadmapData[activePhase].status)
                }`}>
                  {roadmapData[activePhase].status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-2">{roadmapData[activePhase].period}</p>
              <p className="text-gray-700 max-w-2xl mx-auto">
                {roadmapData[activePhase].description}
              </p>
            </div>

            {/* Milestones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmapData[activePhase].milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#5DADE2]/10 p-3 rounded-full">
                      <milestone.icon className="h-6 w-6 text-[#5DADE2]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {milestone.title}
                        </h4>
                        {getStatusIcon(milestone.status)}
                      </div>
                      <p className="text-gray-600 mb-3">{milestone.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{milestone.date}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusColor(milestone.status)
                        }`}>
                          {milestone.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Visualization */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Timeline</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive view of our journey from inception to our future goals
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {roadmapData.map((phase, phaseIndex) => (
                <motion.div
                  key={phaseIndex}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: phaseIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mb-12"
                >
                  {/* Phase Marker */}
                  <div className="absolute left-6 w-4 h-4 bg-[#5DADE2] rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Phase Content */}
                  <div className="ml-20">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{phase.phase}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusColor(phase.status)
                        }`}>
                          {phase.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{phase.period}</p>
                      <p className="text-gray-700 mb-4">{phase.description}</p>
                      
                      {/* Key Achievements */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">Key Milestones:</h4>
                        <ul className="space-y-1">
                          {phase.milestones.slice(0, 2).map((milestone, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              {getStatusIcon(milestone.status)}
                              <span className="ml-2">{milestone.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 bg-[#5DADE2]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Projected Impact by 2030</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our ambitious goals for the next decade of transformative work
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">100K+</div>
              <p className="text-blue-100">Lives Transformed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">50</div>
              <p className="text-blue-100">Self-Sustaining Communities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">25</div>
              <p className="text-blue-100">States Covered</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <p className="text-blue-100">Regional Centers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Be Part of Our Journey</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your support helps us achieve these ambitious goals and transform more lives across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#5DADE2] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 transition-colors"
              >
                Support Our Mission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#5DADE2] text-[#5DADE2] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5DADE2] hover:text-white transition-all"
              >
                Become a Partner
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}