'use client'

import Image from 'next/image'
import { Award, GraduationCap, MapPin, BookOpen, Heart } from 'lucide-react'

export default function About() {
  const credentials = [
    { icon: GraduationCap, text: 'DVM - Michigan State University' },
    { icon: GraduationCap, text: 'PhD - Nippon Veterinary and Life Science University' },
    { icon: Award, text: 'DACVIM (Nutrition) - Board Certified Veterinary Nutritionist®' },
    { icon: Award, text: 'CVA - Certified Veterinary Acupuncturist' },
  ]

  const achievements = [
    '2022 Waltham Award recipient at American Academy of Veterinary Nutrition Clinical Nutrition & Research Symposium',
    'Assistant Professor at Nippon Veterinary and Life Science University, Tokyo',
    'Co-owner and veterinarian at general medicine practice in San Francisco',
    'Published author in peer-reviewed scientific journals and textbooks',
    'Co-author of "Nutrition for the Hospitalized Patient and the Importance of Nutritional Assessment in Critical Care" in Advances In Small Animal Care'
  ]

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Dr. Yuki Okada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A distinguished veterinary nutritionist with international expertise in both Western and Eastern medicine, 
            dedicated to advancing pet health through evidence-based nutritional care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image and Credentials */}
          <div className="space-y-6">
            <div className="relative">
              <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://cms-uvc-prod-asset.s3.us-east-1.amazonaws.com/optimv2/1744298699768-bebc6fc7-126e-488e-b9d2-03950a8ea200-3_large.webp"
                  alt="Dr. Yuki Okada - Veterinary Nutrition Specialist"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-700">Dr. Yuki Okada</p>
                <p className="text-xs text-gray-500">Veterinary Nutrition Specialist</p>
              </div>
            </div>

            {/* Credentials */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credentials & Certifications</h3>
              <div className="space-y-3">
                {credentials.map((credential, index) => {
                  const Icon = credential.icon
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-primary-600" />
                      <span className="text-gray-700">{credential.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Journey</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Dr. Yuki Okada, originally from Japan and raised in the San Francisco Bay Area, 
                  has built an impressive career spanning both Western and Eastern veterinary medicine. 
                  Her academic foundation began at UC Berkeley, followed by her DVM from Michigan State University.
                </p>
                <p>
                  After more than a decade of clinical practice, Dr. Okada pursued advanced studies, 
                  obtaining her PhD in veterinary biochemistry from Nippon Veterinary and Life Science University 
                  in Tokyo, where she also served as an assistant professor.
                </p>
                <p>
                  Returning to California, Dr. Okada joined a general medicine practice in San Francisco 
                  as a veterinarian and co-owner. Concurrently, she pursued an American College of Veterinary 
                  Internal Medicine (ACVIM) residency in Nutrition, jointly supported by Veterinary Nutrition 
                  Specialty Service, Pet Emergency and Specialty Center of Marin, and Balance IT®.
                </p>
                <p>
                  In 2023, Dr. Okada achieved Diplomate status with the ACVIM as a Board-Certified 
                  Veterinary Nutritionist®, marking a significant milestone in her distinguished career.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Research & Publications</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      2022 Waltham Award Recipient
                    </p>
                    <p className="text-sm text-gray-600">
                      American Academy of Veterinary Nutrition Clinical Nutrition & Research Symposium
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">
                      Textbook Chapter Author
                    </p>
                    <p className="text-sm text-gray-600">
                      "Nutrition for the Hospitalized Patient and the Importance of Nutritional Assessment in Critical Care" 
                      in Advances In Small Animal Care
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Dr. Okada's scholarly contributions span several peer-reviewed scientific journals, 
                  contributing to the advancement of veterinary nutrition science and clinical practice.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Interests</h3>
              <div className="flex items-center space-x-3">
                <Heart className="h-5 w-5 text-accent-500" />
                <p className="text-gray-700">
                  Outside of her professional endeavors, Dr. Okada delights in exploring diverse cuisines, 
                  staying active, traveling internationally, and sharing cuddles with her cherished 
                  18-year-old rescue cat, Monchichi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-primary-100 max-w-3xl mx-auto leading-relaxed">
              To provide evidence-based, personalized nutritional care for pets through innovative technology 
              and expert consultation, ensuring every patient receives the highest standard of veterinary 
              nutrition support for optimal health outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
