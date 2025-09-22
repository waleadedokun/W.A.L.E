'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Phone, Mail } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/success-stories', label: 'Success Stories' },
    { href: '/transparency', label: 'Transparency' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-[#FFC857] py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center md:justify-between items-center text-sm">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+234 806 123 4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@hopehelps.ng</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span>Making a difference, one life at a time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#FFF3E1] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-[#5DADE2] p-2 rounded-full"
              >
                <Heart className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-gray-800">HopeHelps</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-[#5DADE2] transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#5DADE2] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                Donate Now
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-gray-700 hover:text-[#5DADE2] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button className="w-full bg-[#5DADE2] text-white py-3 rounded-lg font-semibold">
                  Donate Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}