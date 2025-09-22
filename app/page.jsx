"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Utensils,
  GraduationCap,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import AnimatedCounter from "@/components/UI/AnimatedCounter";
import PaymentWidget from "@/components/Payment/PaymentWidget";

export default function Homepage() {
  const [currentStory, setCurrentStory] = useState(0);

  const successStories = [
    {
      id: 1,
      name: "Adebayo Olusola",
      story:
        "From daily meal recipient to successful bakery owner, Adebayo's journey shows the power of skill development.",
      image:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
      program: "Skills Training",
    },
    {
      id: 2,
      name: "Fatima Mohammed",
      story:
        "Through our empowerment program, Fatima started her fashion business and now employs 5 people.",
      image:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
      program: "Trade Empowerment",
    },
    {
      id: 3,
      name: "Chinedu Okwu",
      story:
        "After receiving meals and training in digital skills, Chinedu now runs a successful tech startup.",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      program: "Digital Skills",
    },
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + successStories.length) % successStories.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextStory, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FFF3E1] via-[#FFF3E1] to-[#FFC857]/20 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Empowering Lives Through
                <span className="text-[#5DADE2]"> Hope</span> and
                <span className="text-[#FFC857]"> Skills</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join us in transforming communities across Nigeria by providing
                sustainable meals and empowering individuals with valuable
                skills and trades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#5DADE2] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
                >
                  <span>Donate Now</span>
                  <Heart className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#5DADE2] text-[#5DADE2] px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-[#5DADE2] hover:text-white transition-all"
                >
                  <Play className="h-5 w-5" />
                  <span>Watch Story</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
                  alt="HopeHelps Community"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <Users className="h-8 w-8 text-[#5DADE2]" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
              >
                <GraduationCap className="h-8 w-8 text-[#FFC857]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Commitment to Change
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every great movement starts with a single step. Here&apos;s what
              we&apos;re building together for communities across Nigeria
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Vision Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#5DADE2]/10 to-[#5DADE2]/5 rounded-2xl p-6 border border-[#5DADE2]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#5DADE2] rounded-xl p-3 shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Community First
                    </h3>
                    <p className="text-gray-600">
                      We&apos;re committed to putting communities at the heart
                      of everything we do, ensuring sustainable change from
                      within.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#FFC857]/20 to-[#FFC857]/10 rounded-2xl p-6 border border-[#FFC857]/30"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFC857] rounded-xl p-3 shrink-0">
                    <Utensils className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Nourishment & Care
                    </h3>
                    <p className="text-gray-600">
                      Addressing immediate needs while building long-term food
                      security programs for vulnerable families.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-6 border border-green-200"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 rounded-xl p-3 shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Skills & Empowerment
                    </h3>
                    <p className="text-gray-600">
                      Creating pathways to economic independence through
                      practical skills training and mentorship programs.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Call to Action Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8 text-center"
            >
              <div className="bg-purple-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Be Part of Day One
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Every transformative organization started with passionate
                individuals who believed in possibility. Your support today
                shapes the foundation of lasting change.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 bg-[#5DADE2] rounded-full"></span>
                  <span>Founded with purpose and transparency</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 bg-[#FFC857] rounded-full"></span>
                  <span>100% commitment to community impact</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Ready to make your contribution count</span>
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-[#5DADE2] to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Join Our Mission
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Core Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We focus on two essential areas that create lasting impact in our
              communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src="https://images.pexels.com/photos/6646964/pexels-photo-6646964.jpeg"
                  alt="Daily Meal Support"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="bg-[#FFC857] p-2 rounded-lg mb-2">
                    <Utensils className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Daily Meal Support
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Providing nutritious meals to individuals and families facing
                  food insecurity. Every meal brings hope and strength for a
                  better tomorrow.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <ArrowRight className="h-4 w-4 text-[#5DADE2] mr-2" />
                    Nutritious daily meals
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight className="h-4 w-4 text-[#5DADE2] mr-2" />
                    Community kitchens
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight className="h-4 w-4 text-[#5DADE2] mr-2" />
                    Food package distribution
                  </li>
                </ul>
                <button className="text-[#5DADE2] font-semibold flex items-center space-x-2 hover:space-x-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                  alt="Skills Development"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="bg-[#5DADE2] p-2 rounded-lg mb-2">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Skills & Trade Empowerment
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Empowering individuals with valuable skills and trades that
                  create sustainable income opportunities and break the cycle of
                  poverty.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <ArrowRight className="h-4 w-4 text-[#5DADE2] mr-2" />
                    Vocational training programs
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight className="h-4 w-4 text-[#5DADE2] mr-2" />
                    Business startup support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <ArrowRight className="h-4 w-4 text-[#5DADE2] mr-2" />
                    Mentorship programs
                  </li>
                </ul>
                <button className="text-[#5DADE2] font-semibold flex items-center space-x-2 hover:space-x-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people whose lives have been transformed
              through our programs
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#FFF3E1] rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  key={currentStory}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img
                    src={successStories[currentStory].image}
                    alt={successStories[currentStory].name}
                    className="rounded-xl w-full h-80 object-cover shadow-lg"
                  />
                  <div className="absolute top-4 right-4 bg-[#5DADE2] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {successStories[currentStory].program}
                  </div>
                </motion.div>

                <motion.div
                  key={`story-${currentStory}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {successStories[currentStory].name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    "{successStories[currentStory].story}"
                  </p>
                  <button className="text-[#5DADE2] font-semibold flex items-center space-x-2 hover:space-x-3 transition-all">
                    <span>Read Full Story</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={prevStory}
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <div className="flex space-x-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentStory ? "bg-[#5DADE2]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextStory}
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Your Donation Creates Lasting Impact
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Every contribution, no matter the size, helps us provide meals,
                skills training, and hope to those who need it most. Join
                thousands of donors making a difference.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#5DADE2] p-2 rounded-full">
                    <Utensils className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      ₦1,000 provides 5 nutritious meals
                    </h4>
                    <p className="text-gray-600">
                      Help feed a family for a day
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#FFC857] p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      ₦25,000 sponsors skills training
                    </h4>
                    <p className="text-gray-600">
                      Empower someone with a valuable trade
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      ₦50,000 transforms a life completely
                    </h4>
                    <p className="text-gray-600">
                      Full support from meals to business startup
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <PaymentWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#5DADE2]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Connected
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get updates on our impact, success stories, and how you can
              continue making a difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFC857] text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
