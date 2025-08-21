'use client'

import { useState } from 'react'
import { Calendar, Clock, Phone, Video, User, Mail, MessageSquare } from 'lucide-react'

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

interface ConsultationType {
  id: string
  name: string
  duration: string
  description: string
  icon: React.ComponentType<any>
}

export default function CalendarScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    patientInfo: '',
    reason: ''
  })

  const consultationTypes: ConsultationType[] = [
    {
      id: 'phone',
      name: 'Phone Consultation',
      duration: '30 minutes',
      description: 'Traditional phone consultation for case discussion',
      icon: Phone
    },
    {
      id: 'video',
      name: 'Video Consultation',
      duration: '45 minutes',
      description: 'Video call with screen sharing for detailed case review',
      icon: Video
    }
  ]

  const timeSlots: TimeSlot[] = [
    { id: '1', time: '9:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: true },
    { id: '3', time: '11:00 AM', available: false },
    { id: '4', time: '1:00 PM', available: true },
    { id: '5', time: '2:00 PM', available: true },
    { id: '6', time: '3:00 PM', available: true },
    { id: '7', time: '4:00 PM', available: false },
  ]

  const availableDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date)
      }
    }
    
    return dates
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime || !selectedType) {
      alert('Please select a date, time, and consultation type')
      return
    }

    // In production, this would submit to a booking API
    console.log('Booking submitted:', {
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      ...formData
    })

    alert('Consultation request submitted! Dr. Okada will contact you to confirm.')
    
    // Reset form
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedType(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      practice: '',
      patientInfo: '',
      reason: ''
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Schedule Consultation</h3>
      <p className="text-gray-600 mb-6">
        Book a consultation with Dr. Okada to discuss your patient's nutritional needs. 
        Choose from available dates and times below.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Date/Time Selection */}
        <div className="space-y-6">
          {/* Consultation Type */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Consultation Type</h4>
            <div className="space-y-3">
              {consultationTypes.map((type) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-6 w-6 ${
                        selectedType === type.id ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h5 className="font-medium text-gray-900">{type.name}</h5>
                        <p className="text-sm text-gray-600">{type.duration}</p>
                        <p className="text-xs text-gray-500">{type.description}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Select Date</h4>
            <div className="grid grid-cols-3 gap-2">
              {availableDates().map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`p-3 text-center rounded-lg border transition-colors duration-200 ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? 'border-primary-500 bg-primary-100 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium">{formatDate(date)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Select Time</h4>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 text-center rounded-lg border transition-colors duration-200 ${
                      !slot.available
                        ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === slot.time
                        ? 'border-primary-500 bg-primary-100 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Clock className="h-4 w-4 mx-auto mb-1" />
                    <div className="text-sm font-medium">{slot.time}</div>
                    <div className="text-xs">
                      {slot.available ? 'Available' : 'Booked'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Booking Form */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Consultation Details</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="(555) 123-4567"
              />
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
                Patient Information
              </label>
              <textarea
                name="patientInfo"
                value={formData.patientInfo}
                onChange={handleInputChange}
                rows={3}
                className="input-field"
                placeholder="Brief description of the patient and case..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Consultation
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows={3}
                className="input-field"
                placeholder="What specific nutritional guidance are you seeking?"
              />
            </div>

            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !selectedType}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request Consultation
            </button>
          </form>

          {/* Summary */}
          {selectedDate && selectedTime && selectedType && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Consultation Summary</h5>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Type:</strong> {consultationTypes.find(t => t.id === selectedType)?.name}</p>
                <p><strong>Duration:</strong> {consultationTypes.find(t => t.id === selectedType)?.duration}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
