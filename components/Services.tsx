'use client'

import { useState } from 'react'
import { Upload, MessageCircle, Calendar, FileText, Brain } from 'lucide-react'
import PDFUploader from './PDFUploader'
import AIConsultant from './AIConsultant'
import CalendarScheduler from './CalendarScheduler'

export default function Services() {
  const [activeService, setActiveService] = useState<string | null>(null)

  const services = [
    {
      id: 'pdf-upload',
      title: 'Case Record Upload',
      description: 'Upload PDF records for AI-powered case analysis and summarization',
      icon: Upload,
      color: 'bg-blue-500',
    },
    {
      id: 'ai-consultant',
      title: 'AI Veterinary Consultant',
      description: 'Chat with Dr. Okada\'s AI assistant for nutritional guidance',
      icon: Brain,
      color: 'bg-green-500',
    },
    {
      id: 'diet-guidance',
      title: 'Pet Diet Guidance',
      description: 'Get specialized dietary recommendations for various conditions',
      icon: MessageCircle,
      color: 'bg-purple-500',
    },
    {
      id: 'scheduling',
      title: 'Schedule Consultation',
      description: 'Book phone or video consultations with Dr. Okada',
      icon: Calendar,
      color: 'bg-orange-500',
    },
  ]

  const renderServiceContent = () => {
    switch (activeService) {
      case 'pdf-upload':
        return <PDFUploader />
      case 'ai-consultant':
        return <AIConsultant />
      case 'diet-guidance':
        return (
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Pet Diet Guidance</h3>
            <p className="text-gray-600 mb-4">
              This feature is coming soon! Dr. Okada is developing a comprehensive 
              dietary guidance system for various pet health conditions.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Coming Soon:</strong> AI-powered dietary recommendations for:
              </p>
              <ul className="list-disc list-inside mt-2 text-sm text-yellow-700">
                <li>Weight management</li>
                <li>Digestive issues</li>
                <li>Kidney disease</li>
                <li>Diabetes management</li>
                <li>Food allergies</li>
              </ul>
            </div>
          </div>
        )
      case 'scheduling':
        return <CalendarScheduler />
      default:
        return (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Select a Service</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose a service above to get started with your consultation.
            </p>
          </div>
        )
    }
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamlined veterinary nutrition consultations powered by AI technology 
            to provide faster, more accurate care for your patients.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Selection */}
          <div className="space-y-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                    activeService === service.id
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${service.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Service Content */}
          <div className="min-h-[500px]">
            {renderServiceContent()}
          </div>
        </div>
      </div>
    </section>
  )
}
