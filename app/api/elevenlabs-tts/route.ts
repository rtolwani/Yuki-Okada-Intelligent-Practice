import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
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

    // Convert text to speech using ElevenLabs TTS
    const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM' // Default voice ID
    
    const ttsResponse = await fetch(`${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
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
      // Return without audio if TTS fails
      return NextResponse.json({
        success: false,
        error: 'TTS conversion failed',
      })
    }

    // Get the audio blob
    const audioBlob = await ttsResponse.blob()
    
    // Convert blob to base64 for inline audio
    const arrayBuffer = await audioBlob.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString('base64')
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

    return NextResponse.json({
      success: true,
      audioUrl: audioUrl,
    })

  } catch (error) {
    console.error('Error in ElevenLabs TTS API:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
