'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In production, this would submit to a contact API
    console.log('Contact form submitted:', formData)
    
    alert('Thank you for your message! Dr. Okada will respond within 24-48 hours.')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      practice: '',
      subject: '',
      message: ''
    })
    
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'dr.okada@veterinarynutrition.com',
      description: 'For general inquiries and consultation requests'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '(415) 555-0123',
      description: 'Available during business hours for urgent matters'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'San Francisco Bay Area, CA',
      description: 'Serving Northern California and remote consultations nationwide'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9:00 AM - 5:00 PM PST',
      description: 'Emergency consultations available outside hours'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to discuss your patient's nutritional needs? Contact Dr. Okada for 
            expert consultation and personalized care plans.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-primary-600 font-medium mb-1">{info.details}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">Consultation Process</h4>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Upload patient records via our secure portal</li>
                <li>AI analysis provides initial case summary</li>
                <li>Schedule consultation with Dr. Okada</li>
                <li>Receive comprehensive nutritional plan</li>
                <li>Ongoing support and follow-up care</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Emergency Consultations</h4>
              <p className="text-sm text-blue-800">
                For urgent nutritional emergencies, please call directly or use the emergency 
                contact form. Dr. Okada prioritizes critical cases and will respond promptly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Dr. Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="your.email@practice.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Practice Name
                </label>
                <input
                  type="text"
                  name="practice"
                  value={formData.practice}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Your Veterinary Practice"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="What can we help you with?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="input-field"
                  placeholder="Please describe your inquiry or case details..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </div>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and consent to being contacted 
                regarding your inquiry.
              </p>
            </form>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-primary-100 mb-6 max-w-2xl mx-auto">
              Join the growing number of veterinarians who trust Dr. Okada for expert 
              nutritional guidance and improved patient outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Start Consultation
              </a>
              <a href="#about" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
