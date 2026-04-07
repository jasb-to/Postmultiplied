import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  const { text } = await request.json()

  try {
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

    return NextResponse.json({
      linkedin: linkedinResponse.choices[0].message.content,
      twitter: twitterResponse.choices[0].message.content,
      instagram: instagramResponse.choices[0].message.content,
      tiktok: tiktokResponse.choices[0].message.content
    })
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