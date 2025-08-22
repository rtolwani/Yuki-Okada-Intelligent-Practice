'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'
import { useConversation } from '@elevenlabs/react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  audioUrl?: string
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
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // ElevenLabs conversation hook
  const conversation = useConversation({
    onMessage: (message) => {
      console.log('Message received:', message)
      
      if (message.source === 'user') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: message.message,
          sender: 'user',
          timestamp: new Date()
        }])
      } else if (message.source === 'ai') {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: message.message,
          sender: 'assistant',
          timestamp: new Date()
        }])
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error)
      setIsLoading(false)
    },
    onConnect: () => {
      console.log('Connected to conversation')
      setIsLoading(false)
      setIsStarted(true)
    },
    onDisconnect: () => {
      console.log('Disconnected from conversation')
      setIsStarted(false)
    },
    onStatusChange: (status: string) => {
      console.log('Conversation status changed:', status)
    }
  })

  const { status, isSpeaking, startSession, endSession, setVolume } = conversation

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle volume changes
  useEffect(() => {
    if (setVolume) {
      setVolume({ volume: isMuted ? 0 : 0.8 })
    }
  }, [isMuted, setVolume])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false)
      recognitionRef.current.stop()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

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
      // Start conversation if not already started
      if (!isStarted) {
        await startSession({
          agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_01jz667k14eq29kxw3b0mxmjn9',
          clientTools: {},
          dynamicVariables: {}
        })
      }

      // Send message through ElevenLabs conversation
      // The message will be handled by the onMessage callback
      // For now, we'll use the local AI response as fallback
      // TODO: Implement actual message sending through ElevenLabs
      const aiResponse = generateAIResponse(inputText)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error in conversation:', error)
      
      // Fallback response without audio
      const fallbackResponse = generateFallbackResponse(inputText)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('weight') || lowerInput.includes('obese') || lowerInput.includes('overweight')) {
      return "For weight management in pets, I recommend a calorie-controlled diet with increased protein and fiber content. Consider a prescription weight loss formula with L-carnitine supplementation. Regular exercise and portion control are crucial. Monitor body condition score and adjust portions accordingly. Would you like specific dietary recommendations based on your patient's current weight and target weight?"
    }
    
    if (lowerInput.includes('kidney') || lowerInput.includes('renal') || lowerInput.includes('kidney disease')) {
      return "Renal diets should be low in protein, phosphorus, and sodium while being high in omega-3 fatty acids and B vitamins. I recommend a prescription renal formula with controlled phosphorus levels. Regular monitoring of kidney values is essential. Consider adding fish oil supplements for anti-inflammatory benefits. What stage of kidney disease are we dealing with?"
    }
    
    if (lowerInput.includes('diabetes') || lowerInput.includes('diabetic') || lowerInput.includes('blood sugar')) {
      return "Diabetic pets benefit from consistent feeding times and high-fiber, complex carbohydrate diets. Avoid simple sugars and consider a prescription diabetic formula. Regular blood glucose monitoring is key. Feed twice daily at the same times, and consider a high-protein, low-carbohydrate approach. Are you looking for dietary recommendations for newly diagnosed or long-term diabetic management?"
    }
    
    if (lowerInput.includes('allergy') || lowerInput.includes('food sensitivity') || lowerInput.includes('itchy') || lowerInput.includes('skin')) {
      return "Food allergies require elimination diets with novel protein sources or hydrolyzed protein formulas. Common allergens include beef, dairy, chicken, and wheat. I recommend starting with a prescription hypoallergenic diet for 8-12 weeks. Consider single-protein diets and avoid treats during the trial period. What symptoms are you seeing?"
    }
    
    if (lowerInput.includes('digestive') || lowerInput.includes('gi') || lowerInput.includes('vomiting') || lowerInput.includes('diarrhea') || lowerInput.includes('stomach')) {
      return "For GI issues, I recommend a highly digestible, low-fat diet with prebiotics. Consider a prescription gastrointestinal formula with added fiber. Small, frequent meals and avoiding table scraps is important. Probiotics and easily digestible proteins like chicken or fish can help. What's the duration and severity of the GI symptoms?"
    }
    
    if (lowerInput.includes('puppy') || lowerInput.includes('kitten') || lowerInput.includes('growth')) {
      return "Growing pets need higher protein and fat content than adults. Look for foods labeled 'growth' or 'all life stages' with AAFCO statements. Feed according to the feeding guide and monitor body condition. Avoid overfeeding as this can lead to rapid growth and joint issues. How old is your patient and what breed?"
    }
    
    if (lowerInput.includes('senior') || lowerInput.includes('older') || lowerInput.includes('aging')) {
      return "Senior pets benefit from higher protein content, joint supplements like glucosamine, and controlled calorie intake to prevent weight gain. Consider foods with added antioxidants and omega-3 fatty acids. Regular veterinary check-ups are important to monitor for age-related conditions. What specific concerns do you have about your senior patient?"
    }
    
    if (lowerInput.includes('cancer') || lowerInput.includes('oncology')) {
      return "Cancer patients often need high-protein, high-fat diets to maintain body condition. Consider prescription oncology formulas with added omega-3 fatty acids and antioxidants. Small, frequent meals may be better tolerated. Work closely with your oncologist to ensure nutritional needs are met during treatment. What type of cancer and what stage are we dealing with?"
    }
    
    if (lowerInput.includes('heart') || lowerInput.includes('cardiac')) {
      return "Cardiac patients often benefit from low-sodium diets with controlled protein levels. Prescription cardiac formulas are available with appropriate sodium restrictions. Monitor for fluid retention and adjust accordingly. Taurine supplementation may be beneficial for certain breeds. What specific cardiac condition are we managing?"
    }
    
    if (lowerInput.includes('liver') || lowerInput.includes('hepatic')) {
      return "Hepatic diets should be moderate in protein, low in copper, and high in B vitamins. Prescription hepatic formulas are available with appropriate nutrient profiles. Avoid high-fat foods and consider adding milk thistle supplements. Regular monitoring of liver values is essential. What's the underlying cause of the liver disease?"
    }
    
    if (lowerInput.includes('dental') || lowerInput.includes('teeth') || lowerInput.includes('oral')) {
      return "Dental health can be supported with dental-specific diets, dental chews, and regular teeth brushing. Look for foods with larger kibble size or special dental formulas. Avoid soft, sticky foods that can contribute to plaque buildup. Regular dental cleanings are still important. What specific dental concerns do you have?"
    }
    
    return "Thank you for your question about pet nutrition. I'm Dr. Okada's AI assistant, and I'd be happy to provide more specific guidance. Could you tell me more about your patient's specific condition, current diet, and any particular concerns you have? This will help me give you the most relevant nutritional advice tailored to your case."
  }

  const generateFallbackResponse = (input: string): string => {
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

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">AI Veterinary Consultant</h3>
            <p className="text-sm text-gray-600">Powered by Dr. Okada's expertise & ElevenLabs</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isStarted ? (
            <button
              onClick={async () => {
                try {
                  setIsLoading(true)
                  await startSession({
                    agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_01jz667k14eq29kxw3b0mxw3b0mxmjn9',
                    clientTools: {},
                    dynamicVariables: {}
                  })
                } catch (error) {
                  console.error('Error starting conversation:', error)
                  setIsLoading(false)
                }
              }}
              disabled={isLoading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Start Conversation
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {status === 'connected' ? 'Connected' : 'Disconnected'}
              </span>
              {isSpeaking && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  AI Speaking...
                </span>
              )}
              <button
                onClick={toggleMute}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-4 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          )}
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
              
              {/* Audio controls for assistant messages */}
              {message.sender === 'assistant' && message.audioUrl && (
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => isPlaying ? stopAudio() : playAudio(message.audioUrl!)}
                    className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors"
                  >
                    {isPlaying ? '⏹️ Stop' : '🔊 Play Audio'}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </button>
                </div>
              )}
              
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
          
          {/* Voice input button */}
          <button
            onClick={handleVoiceInput}
            disabled={isLoading}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
          
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className="btn-primary self-end disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        {/* Voice input status */}
        {isListening && (
          <div className="mt-2 text-sm text-red-600 flex items-center space-x-2">
            <Mic className="h-4 w-4 animate-pulse" />
            <span>Listening... Speak now</span>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Use voice input or type your questions. This AI consultant connects to ElevenLabs for real-time responses.
        </p>
      </div>

      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
    </div>
  )
}
