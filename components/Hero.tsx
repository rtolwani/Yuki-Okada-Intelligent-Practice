'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Expert Veterinary
                <span className="text-primary-600 block">Nutrition Care</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Board Certified Veterinary Nutritionist providing specialized nutritional consultations 
                and AI-powered case analysis for optimal pet health outcomes.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {['DVM', 'PhD', 'CVA', 'DACVIM'].map((credential) => (
                    <span
                      key={credential}
                      className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-lg font-semibold text-primary-700">
                Board Certified Veterinary Nutritionist®
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="btn-primary text-center"
              >
                Start Consultation
              </a>
              <a
                href="#about"
                className="btn-secondary text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cms-uvc-prod-asset.s3.us-east-1.amazonaws.com/optimv2/1744298699768-bebc6fc7-126e-488e-b9d2-03950a8ea200-3_large.webp"
                alt="Dr. Yuki Okada - Veterinary Nutrition Specialist"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700">Dr. Yuki Okada</p>
              <p className="text-xs text-gray-500">Veterinary Nutrition Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
