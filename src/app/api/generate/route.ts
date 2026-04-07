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
    const systemPrompt = `You are an expert social media strategist and copywriter. Transform user input into platform-specific posts that sound natural and authentic to each platform's audience and culture.

CRITICAL: Return ONLY valid JSON with NO markdown, NO code blocks, NO backticks. Just raw JSON.`

    const userPrompt = `Transform this idea into 4 platform-specific posts that sound like they were written by a real person, not AI.

INPUT: "${text}"

OUTPUT RULES (VERY IMPORTANT - Follow exactly):

1. LINKEDIN - Professional but human, insightful, 2-3 short paragraphs max, NO hashtag overload, authoritative but approachable
2. X/TWITTER - Punchy hook first, max 280 chars OR a 2-3 tweet thread with strong flow, high engagement
3. INSTAGRAM - Aesthetic and engaging, include emojis naturally, 8-12 relevant hashtags at end, personal tone
4. TIKTOK - Script format with [brackets for actions], hook in first 5 words to stop scrolls, conversational and fast-paced, 30-60 seconds when read aloud

Return ONLY this JSON format (no markdown, no code blocks, no extra text):
{
  "linkedin": "...",
  "twitter": "...",
  "instagram": "...",
  "tiktok": "..."
}`

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      max_tokens: 1200,
      temperature: 0.8
    })

    let result
    try {
      const responseText = response.choices[0].message.content || ''
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      result = JSON.parse(jsonMatch ? jsonMatch[0] : responseText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse generated content. Please try again.' },
        { status: 500 }
      )
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
