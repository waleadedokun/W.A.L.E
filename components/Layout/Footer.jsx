'use client'
import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-[#5DADE2] p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">HopeHelps</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering Nigerians through sustainable meals and skill development programs. 
              Together, we build a future where everyone has the opportunity to thrive.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#5DADE2] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#5DADE2] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#5DADE2] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#5DADE2] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/roadmap" className="text-gray-300 hover:text-white transition-colors">Our Roadmap</Link></li>
              <li><Link href="/success-stories" className="text-gray-300 hover:text-white transition-colors">Success Stories</Link></li>
              <li><Link href="/transparency" className="text-gray-300 hover:text-white transition-colors">Transparency</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Programs</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Daily Meal Support</li>
              <li className="text-gray-300">Skills Development</li>
              <li className="text-gray-300">Trade Empowerment</li>
              <li className="text-gray-300">Educational Support</li>
              <li className="text-gray-300">Community Outreach</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#5DADE2] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Hope Street, Victoria Island</p>
                  <p className="text-gray-300">Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#5DADE2]" />
                <span className="text-gray-300">+234 806 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#5DADE2]" />
                <span className="text-gray-300">info@hopehelps.ng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} HopeHelps NGO. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}