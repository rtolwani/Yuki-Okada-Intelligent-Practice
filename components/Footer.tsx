'use client'

import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Case Record Upload', href: '#services' },
      { name: 'AI Consultation', href: '#services' },
      { name: 'Diet Guidance', href: '#services' },
      { name: 'Schedule Consultation', href: '#services' },
    ],
    about: [
      { name: 'Dr. Yuki Okada', href: '#about' },
      { name: 'Credentials', href: '#about' },
      { name: 'Research', href: '#about' },
      { name: 'Publications', href: '#about' },
    ],
    resources: [
      { name: 'Nutrition Guidelines', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Research Papers', href: '#' },
      { name: 'Educational Materials', href: '#' },
    ],
    contact: [
      { name: 'Contact Form', href: '#contact' },
      { name: 'Emergency Contact', href: '#contact' },
      { name: 'Consultation Process', href: '#contact' },
      { name: 'Business Hours', href: '#contact' },
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Dr. Yuki Okada
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Board Certified Veterinary Nutritionist providing expert nutritional consultation 
              and AI-powered case analysis for optimal pet health outcomes.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">dr.okada@veterinarynutrition.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">(415) 555-0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">San Francisco Bay Area, CA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300 text-sm">Mon-Fri: 9:00 AM - 5:00 PM PST</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Dr. Yuki Okada Veterinary Nutrition Practice. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm">
                HIPAA Compliance
              </a>
            </div>
          </div>

          {/* Credentials */}
          <div className="mt-6 text-center">
            <div className="flex flex-wrap justify-center items-center space-x-4 text-xs text-gray-500">
              <span>DVM, PhD, CVA</span>
              <span>•</span>
              <span>DACVIM (Nutrition)</span>
              <span>•</span>
              <span>Board Certified Veterinary Nutritionist®</span>
              <span>•</span>
              <span>2022 Waltham Award Recipient</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
