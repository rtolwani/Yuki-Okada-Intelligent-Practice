'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, User, Loader2, Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react'
import { useConversation } from '@elevenlabs/react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  audioUrl?: string
}

export default function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
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
    onStatusChange: (statusObj: { status: string }) => {
      console.log('Conversation status changed:', statusObj.status)
    },
    onDebug: (debugInfo) => {
      console.log('ElevenLabs debug:', debugInfo)
    }
  })

  const { status, isSpeaking, startSession, endSession, setVolume } = conversation

  const scrollToBottom = () => {
    // Use scrollTop instead of scrollIntoView to avoid affecting page scroll
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      container.scrollTop = container.scrollHeight
    }
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

  // Auto-activate microphone when AI finishes speaking
  useEffect(() => {
    if (isStarted && !isSpeaking && !isListening) {
      // Small delay to ensure AI has completely finished
      const timer = setTimeout(() => {
        if (!isSpeaking && !isListening && isStarted) {
          startListening()
        }
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [isSpeaking, isStarted, isListening])

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
        console.log('Speech recognized:', transcript)
        setIsListening(false)
        // Speech will be automatically sent through ElevenLabs
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
    if (recognitionRef.current && isStarted && !isSpeaking) {
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

  const handleStartConversation = async () => {
    setIsLoading(true)
    try {
      await startSession({
        agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || 'agent_01jz667k14eq29kxw3b0mxmjn9',
        connectionType: 'websocket',
        clientTools: {},
        dynamicVariables: {}
      })
    } catch (error) {
      console.error('Error starting conversation:', error)
      setIsLoading(false)
    }
  }

  const handleEndConversation = async () => {
    setIsLoading(true)
    // Stop listening first
    if (isListening) {
      stopListening()
    }
    try {
      await endSession()
      setIsStarted(false)
    } catch (error) {
      console.error('Error ending conversation:', error)
    } finally {
      setIsLoading(false)
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
            <p className="text-sm text-gray-600">Powered by Dr. Okada's expertise</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isStarted && (
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {status === 'connected' ? 'Connected' : 'Disconnected'}
              </span>
              {/* <button
                onClick={handleVoiceInput}
                disabled={isLoading || isSpeaking}
                className={`p-2 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
                title={isListening ? 'Stop listening' : 'Start listening'}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button> */}
              {/* <button
                onClick={toggleMute}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-5 h-5" />}
              </button> */}
              <button
                onClick={handleEndConversation}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
                title="End Conversation"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PhoneOff className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4"
      >
        {!isStarted && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <Bot className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              AI Veterinary Nutritional Consultant
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Conversation with Dr. Okada's AI assistant.
            </p>
            <button
              onClick={handleStartConversation}
              disabled={isLoading}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  <span>Start Conversation</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Status Bar - Only show when conversation is started */}
      {isStarted && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-center space-x-4">
            {!isSpeaking && (
              <div className="flex items-center space-x-2 text-red-600">
                <Mic className="h-5 w-5 animate-pulse" />
                <span className="text-sm font-medium">Listening...</span>
              </div>
            )}
            {isSpeaking && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Volume2 className="h-5 w-5 animate-pulse" />
                <span className="text-sm font-medium">AI is speaking...</span>
              </div>
            )}
          </div>
        </div>
      )}

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
