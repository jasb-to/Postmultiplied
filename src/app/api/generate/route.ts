import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import { checkCreditsAvailable, savePost, incrementCreditsUsed, createUserIfNotExists } from '@/lib/db'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Ensure user exists in database
    const email = sessionClaims?.email as string || 'unknown'
    await createUserIfNotExists(userId, email)

    // Check if user has credits
    const hasCredits = await checkCreditsAvailable(userId)
    if (!hasCredits) {
      return NextResponse.json(
        { error: 'Insufficient credits. Upgrade your plan to generate more content.' },
        { status: 429 }
      )
    }

    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text input is required' },
        { status: 400 }
      )
    }
    const linkedinResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional LinkedIn content writer. Create a polished, professional post that showcases expertise and thought leadership."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    })

    const twitterResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a punchy Twitter content writer. Create a concise, engaging tweet with strong hooks and calls to action."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 100,
      temperature: 1.2
    })

    const instagramResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an aesthetic Instagram content writer. Create a visually appealing caption with emojis and hashtags."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 150,
      temperature: 0.8
    })

    const tiktokResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a TikTok script writer. Create an engaging script with strong hooks, pacing, and calls to action."
        },
        {
          role: "user",
          content: text
        }
      ],
      max_tokens: 300,
      temperature: 1.0
    })

    const result = {
      linkedin: linkedinResponse.choices[0].message.content,
      twitter: twitterResponse.choices[0].message.content,
      instagram: instagramResponse.choices[0].message.content,
      tiktok: tiktokResponse.choices[0].message.content
    }

    // Save post and increment credits
    try {
      await savePost(userId, text, result)
      await incrementCreditsUsed(userId)
    } catch (dbError) {
      console.error('Error saving post:', dbError)
      // Still return the generated content even if saving fails
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating content:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate content. Please try again.'
      },
      { status: 500 }
    )
  }
}
