import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, agentId } = await request.json()

    if (!message || !agentId) {
      return NextResponse.json(
        { error: 'Message and agentId are required' },
        { status: 400 }
      )
    }

    // ElevenLabs API configuration
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
    const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1'

    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY environment variable not set')
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      )
    }

    // Step 1: Send message to ElevenLabs agent
    const agentResponse = await fetch(`${ELEVENLABS_BASE_URL}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        message: message,
        stream: false,
        enable_streaming: false,
      }),
    })

    if (!agentResponse.ok) {
      const errorText = await agentResponse.text()
      console.error('ElevenLabs agent API error:', errorText)
      throw new Error(`Agent API failed: ${agentResponse.status}`)
    }

    const agentData = await agentResponse.json()
    const aiResponse = agentData.response || 'I apologize, but I received an empty response.'

    // Step 2: Convert AI response to speech using ElevenLabs TTS
    const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM' // Default voice ID
    
    const ttsResponse = await fetch(`${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: aiResponse,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    })

    if (!ttsResponse.ok) {
      console.error('ElevenLabs TTS API error:', ttsResponse.status)
      // Return text response without audio if TTS fails
      return NextResponse.json({
        response: aiResponse,
        audioUrl: null,
      })
    }

    // Get the audio blob
    const audioBlob = await ttsResponse.blob()
    
    // Convert blob to base64 for inline audio (alternative approach)
    const arrayBuffer = await audioBlob.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString('base64')
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

    return NextResponse.json({
      response: aiResponse,
      audioUrl: audioUrl,
      success: true,
    })

  } catch (error) {
    console.error('Error in ElevenLabs chat API:', error)
    
    // Return a fallback response if the API fails
    return NextResponse.json({
      response: "I apologize, but I'm experiencing technical difficulties with my voice system. Please try again or contact Dr. Okada directly for urgent matters.",
      audioUrl: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
