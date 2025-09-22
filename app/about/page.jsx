'use client'
import { motion } from 'framer-motion'
import { Users, Target, Eye, Heart, Award, Globe } from 'lucide-react'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import AnimatedCounter from '@/components/UI/AnimatedCounter'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Adaora Okechukwu",
      role: "Executive Director",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
      bio: "With over 15 years in community development, Adaora leads our mission with passion and dedication."
    },
    {
      name: "Ibrahim Yusuf",
      role: "Programs Manager",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
      bio: "Ibrahim oversees our daily operations and ensures our programs reach those who need them most."
    },
    {
      name: "Grace Okafor",
      role: "Skills Development Lead",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
      bio: "Grace designs and implements our empowerment programs, helping people build sustainable livelihoods."
    },
    {
      name: "Taiwo Adebayo",
      role: "Community Outreach",
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
      bio: "Taiwo connects with communities across Nigeria, identifying needs and building partnerships."
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every interaction with empathy and understanding, recognizing the dignity in every person."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of communities working together to create lasting positive change."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in all our programs, ensuring maximum impact for every donation."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "We focus on creating long-term solutions that empower people to build better futures."
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
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              About <span className="text-[#5DADE2]">HopeHelps</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded on the belief that every person deserves hope, dignity, and opportunity, 
              HopeHelps has been transforming lives across Nigeria through sustainable programs 
              that address immediate needs while building long-term prosperity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-[#5DADE2]/10 rounded-2xl"
            >
              <div className="bg-[#5DADE2] p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower communities across Nigeria by providing sustainable meal programs and 
                skills development opportunities that break the cycle of poverty and create lasting impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-[#FFC857]/20 rounded-2xl"
            >
              <div className="bg-[#FFC857] p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A Nigeria where every person has access to nutritious meals, valuable skills, and 
                the opportunity to build a prosperous future for themselves and their families.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-green-50 rounded-2xl"
            >
              <div className="bg-green-500 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Through community partnerships and transparent operations, we've created sustainable 
                change that continues to grow and benefit generations of Nigerian families.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  HopeHelps was born in 2020 from a simple observation: while many organizations 
                  focus on immediate relief, lasting change requires addressing both immediate needs 
                  and long-term empowerment.
                </p>
                <p>
                  Our founder, Adaora Okechukwu, witnessed firsthand how providing meals alongside 
                  skills training created a sustainable path out of poverty. What started as a small 
                  community initiative has grown into a nationwide movement.
                </p>
                <p>
                  Today, we operate in 15 states across Nigeria, with a network of partners, 
                  volunteers, and beneficiaries who share our vision of a more prosperous and 
                  equitable society.
                </p>
                <p>
                  Every success story strengthens our commitment to transparency, accountability, 
                  and measurable impact. We believe that lasting change happens when communities 
                  are empowered to lift themselves up.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
                alt="Our Story 1"
                className="rounded-lg shadow-lg h-64 w-full object-cover"
              />
              <img
                src="https://images.pexels.com/photos/6646964/pexels-photo-6646964.jpeg"
                alt="Our Story 2"
                className="rounded-lg shadow-lg h-64 w-full object-cover mt-8"
              />
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                alt="Our Story 3"
                className="rounded-lg shadow-lg h-64 w-full object-cover -mt-8"
              />
              <img
                src="https://images.pexels.com/photos/6646971/pexels-photo-6646971.jpeg"
                alt="Our Story 4"
                className="rounded-lg shadow-lg h-64 w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide every decision we make and every program we implement
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="bg-[#5DADE2]/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-[#5DADE2]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals dedicated to creating positive change in Nigerian communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-[#5DADE2] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-[#5DADE2]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Growing Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how we've grown since our founding and the increasing impact we're making
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter end={15} suffix=" States" />
              <p className="text-blue-100 mt-2 font-medium">Operating Regions</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={127} suffix=" Partners" />
              <p className="text-blue-100 mt-2 font-medium">Community Partners</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={45} suffix="+" />
              <p className="text-blue-100 mt-2 font-medium">Team Members</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={98} suffix="%" />
              <p className="text-blue-100 mt-2 font-medium">Transparency Score</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}