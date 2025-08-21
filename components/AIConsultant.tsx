'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

export default function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Dr. Okada's AI Veterinary Nutritional Consultant. I'm here to help you with nutritional questions and case discussions. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // Simulate AI response - in production, this would call ElevenLabs API
      // const response = await fetch('/api/elevenlabs-chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     message: inputText,
      //     agentId: 'agent_01jz667k14eq29kxw3b0mxmjn9'
      //   })
      // })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock AI response based on input
      const aiResponse = generateMockResponse(inputText)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again or contact Dr. Okada directly for urgent matters.",
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('weight') || lowerInput.includes('obese')) {
      return "For weight management in pets, I recommend a calorie-controlled diet with increased protein and fiber content. Consider a prescription weight loss formula with L-carnitine supplementation. Regular exercise and portion control are crucial. Would you like me to provide specific dietary recommendations based on your patient's current weight and target weight?"
    }
    
    if (lowerInput.includes('kidney') || lowerInput.includes('renal')) {
      return "Renal diets should be low in protein, phosphorus, and sodium while being high in omega-3 fatty acids and B vitamins. I recommend a prescription renal formula with controlled phosphorus levels. Regular monitoring of kidney values is essential. What stage of kidney disease are we dealing with?"
    }
    
    if (lowerInput.includes('diabetes') || lowerInput.includes('diabetic')) {
      return "Diabetic pets benefit from consistent feeding times and high-fiber, complex carbohydrate diets. Avoid simple sugars and consider a prescription diabetic formula. Regular blood glucose monitoring is key. Are you looking for dietary recommendations for newly diagnosed or long-term diabetic management?"
    }
    
    if (lowerInput.includes('allergy') || lowerInput.includes('food sensitivity')) {
      return "Food allergies require elimination diets with novel protein sources or hydrolyzed protein formulas. Common allergens include beef, dairy, chicken, and wheat. I recommend starting with a prescription hypoallergenic diet for 8-12 weeks. What symptoms are you seeing?"
    }
    
    if (lowerInput.includes('digestive') || lowerInput.includes('gi') || lowerInput.includes('vomiting') || lowerInput.includes('diarrhea')) {
      return "For GI issues, I recommend a highly digestible, low-fat diet with prebiotics. Consider a prescription gastrointestinal formula with added fiber. Small, frequent meals and avoiding table scraps is important. What's the duration and severity of the GI symptoms?"
    }
    
    return "Thank you for your question about pet nutrition. I'd be happy to provide more specific guidance. Could you tell me more about your patient's specific condition, current diet, and any particular concerns you have? This will help me give you the most relevant nutritional advice."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-100 p-2 rounded-lg">
          <Bot className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">AI Veterinary Consultant</h3>
          <p className="text-sm text-gray-600">Powered by Dr. Okada's expertise</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'assistant' && (
                  <Bot className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                )}
                {message.sender === 'user' && (
                  <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
                <span className="text-sm text-gray-600">Dr. Okada's AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about pet nutrition, case management, or dietary recommendations..."
            className="flex-1 input-field resize-none"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          This AI consultant provides general guidance. For specific cases, please upload records and schedule a consultation with Dr. Okada.
        </p>
      </div>
    </div>
  )
}
