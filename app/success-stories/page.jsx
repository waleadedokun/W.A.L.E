'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Calendar, User, ArrowRight, Heart, Star } from 'lucide-react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { supabase } from '@/lib/supabase'

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([])
  const [filteredStories, setFilteredStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const storiesPerPage = 6

  // Sample data for demonstration
  const sampleStories = [
    {
      id: 1,
      title: "From Street Vendor to Bakery Owner",
      excerpt: "Adebayo's journey from selling bread on the streets to owning his own bakery shows the power of skills training and determination.",
      content: "Adebayo Olusola was selling bread on the streets of Lagos when he first heard about HopeHelps. Struggling to feed his family of four, he was skeptical about the promises of change. But the daily meal support gave him hope, and the skills training program gave him direction. Through our bakery training program, Adebayo learned professional baking techniques, business management, and financial planning. Today, he owns 'Ade's Fresh Bakery' in Ikeja, employs three people, and has become a mentor in our program. His story reminds us that with the right support, anyone can transform their circumstances.",
      author_name: "Adebayo Olusola",
      program_type: "Skills Training",
      images: ["https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg"],
      featured: true,
      created_at: "2024-01-15",
      impact_metrics: {
        jobs_created: 3,
        monthly_income: 150000,
        family_members_supported: 4
      }
    },
    {
      id: 2,
      title: "Fashion Designer's Dream Realized",
      excerpt: "Fatima transformed her passion for fashion into a thriving business that now employs five women in her community.",
      content: "Fatima Mohammed always had a passion for fashion, but as a single mother in Kano, she couldn't afford to pursue her dreams. When HopeHelps introduced the fashion design training program in her community, she was among the first to enroll. The program not only taught her advanced sewing techniques but also provided her with a sewing machine and startup capital. Today, 'Fatima's Fashion House' is known throughout Kano for its beautiful traditional and modern designs. She has employed five women from her community and regularly participates in fashion shows across Northern Nigeria.",
      author_name: "Fatima Mohammed",
      program_type: "Trade Empowerment",
      images: ["https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg"],
      featured: true,
      created_at: "2024-02-20",
      impact_metrics: {
        jobs_created: 5,
        monthly_income: 200000,
        family_members_supported: 2
      }
    },
    {
      id: 3,
      title: "Tech Entrepreneur's Rise",
      excerpt: "From receiving daily meals to running a successful tech startup, Chinedu's story shows the power of digital skills training.",
      content: "Chinedu Okwu was a university graduate who couldn't find work in his field. Surviving on odd jobs and occasional meals from HopeHelps, he felt his computer science degree was worthless. Everything changed when he joined our digital skills training program. Learning web development, digital marketing, and entrepreneurship, Chinedu discovered his potential. He started by building websites for small businesses in his community. Today, 'ChiTech Solutions' has 12 employees and serves clients across West Africa. Chinedu now sponsors other young people through our program.",
      author_name: "Chinedu Okwu",
      program_type: "Digital Skills",
      images: ["https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg"],
      featured: false,
      created_at: "2024-03-10",
      impact_metrics: {
        jobs_created: 12,
        monthly_income: 500000,
        family_members_supported: 3
      }
    },
    {
      id: 4,
      title: "Agricultural Innovation Success",
      excerpt: "Grace turned a small plot of land into a thriving agricultural business using modern farming techniques learned through our program.",
      content: "Grace Adebisi inherited a small plot of land from her father but didn't know how to make it productive. Living in rural Ogun State with her three children, she struggled to make ends meet. HopeHelps' agricultural training program taught her modern farming techniques, crop rotation, and sustainable practices. She learned to grow high-yield vegetables and started a small poultry farm. Today, Grace supplies fresh produce to restaurants in nearby towns and has become a leader in her farming community. Her success has inspired 20 other women to join the agricultural program.",
      author_name: "Grace Adebisi",
      program_type: "Agricultural Training",
      images: ["https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"],
      featured: false,
      created_at: "2024-04-05",
      impact_metrics: {
        jobs_created: 2,
        monthly_income: 80000,
        family_members_supported: 3
      }
    },
    {
      id: 5,
      title: "Carpentry Workshop Owner",
      excerpt: "From unemployed youth to master craftsman, Emeka's carpentry skills now support his entire extended family.",
      content: "Emeka Nwachukwu was 25 and had never held a steady job. Living in Enugu with his elderly parents and younger siblings, he felt like a burden on his family. The carpentry training program at HopeHelps gave him purpose and direction. Starting with basic woodworking skills, Emeka showed exceptional talent and dedication. His instructors helped him set up a small workshop, and word of his quality work spread quickly. Today, 'Emeka's Woodworks' creates custom furniture for homes and offices across Enugu State. He has trained six apprentices and supports not just his immediate family but also helps other young people in his community.",
      author_name: "Emeka Nwachukwu",
      program_type: "Carpentry Training",
      images: ["https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg"],
      featured: false,
      created_at: "2024-05-12",
      impact_metrics: {
        jobs_created: 6,
        monthly_income: 120000,
        family_members_supported: 7
      }
    },
    {
      id: 6,
      title: "Beauty Salon Empire",
      excerpt: "Blessing built a chain of beauty salons across Rivers State after completing our cosmetology training program.",
      content: "Blessing Peterside was working as a house help in Port Harcourt when she heard about HopeHelps' cosmetology training program. Despite having only primary school education, she was determined to learn a skill that could change her life. The six-month program taught her hair styling, makeup artistry, and salon management. Starting with a small corner in her one-room apartment, Blessing gradually built her clientele. Today, she owns three beauty salons across Rivers State, employs 15 women, and has become a role model for young women in her community. She regularly returns to train new participants in our program.",
      author_name: "Blessing Peterside",
      program_type: "Cosmetology Training",
      images: ["https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg"],
      featured: true,
      created_at: "2024-06-18",
      impact_metrics: {
        jobs_created: 15,
        monthly_income: 300000,
        family_members_supported: 5
      }
    }
  ]

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    setStories(sampleStories)
    setFilteredStories(sampleStories)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = stories

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.program_type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'featured') {
        filtered = filtered.filter(story => story.featured)
      } else {
        filtered = filtered.filter(story => 
          story.program_type.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      }
    }

    setFilteredStories(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedFilter, stories])

  const programTypes = [
    'all',
    'featured',
    'skills training',
    'trade empowerment',
    'digital skills',
    'agricultural training',
    'carpentry training',
    'cosmetology training'
  ]

  // Pagination
  const indexOfLastStory = currentPage * storiesPerPage
  const indexOfFirstStory = indexOfLastStory - storiesPerPage
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory)
  const totalPages = Math.ceil(filteredStories.length / storiesPerPage)

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DADE2]"></div>
        </div>
        <Footer />
      </div>
    )
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
              Success <span className="text-[#5DADE2]">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Real stories from real people whose lives have been transformed through our programs. 
              These inspiring journeys show the power of hope, skills, and community support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DADE2] focus:border-transparent"
              >
                {programTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {currentStories.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative h-64">
                    <img
                      src={story.images[0]}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Featured Badge */}
                    {story.featured && (
                      <div className="absolute top-4 left-4 bg-[#FFC857] text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Program Type */}
                    <div className="absolute top-4 right-4 bg-[#5DADE2] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {story.program_type}
                    </div>

                    {/* Author Info */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{story.author_name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#5DADE2] transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {story.excerpt}
                    </p>

                    {/* Impact Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#5DADE2]">
                          {story.impact_metrics.jobs_created}
                        </div>
                        <div className="text-xs text-gray-500">Jobs Created</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#FFC857]">
                          ₦{(story.impact_metrics.monthly_income / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-500">Monthly Income</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {story.impact_metrics.family_members_supported}
                        </div>
                        <div className="text-xs text-gray-500">Family Supported</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(story.created_at).toLocaleDateString()}
                      </div>
                      <button className="text-[#5DADE2] font-semibold flex items-center space-x-1 hover:space-x-2 transition-all">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? 'bg-[#5DADE2] text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#5DADE2]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Your Story Could Be Next</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our programs and become part of the growing community of success stories. 
              Every journey starts with a single step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#5DADE2] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Apply for Programs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#5DADE2] transition-all"
              >
                Support Others
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}