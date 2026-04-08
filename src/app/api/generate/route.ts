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
    const systemPrompt = `You are a world-class social media ghostwriter. Your job is to transform ONE idea into FOUR completely different posts, each perfectly native to its platform.

Each post must feel like it was written specifically for that platform — not adapted.

Return ONLY valid JSON (no explanations, no markdown, no code blocks):
{
  "linkedin": "...",
  "twitter": "...",
  "instagram": "...",
  "tiktok": "..."
}`

    const userPrompt = `INPUT IDEA:
"${text}"

---

LINKEDIN:
- Tone: professional, insightful, slightly authoritative
- Structure: short paragraphs, clean spacing
- Style: thought leadership, personal insight or lesson
- Avoid: emojis overload, slang

---

X (TWITTER):
- Tone: punchy, sharp, engaging
- Start with a strong hook
- Either: One viral-style tweet (max impact) OR a short thread (2–3 tweets max)
- Avoid fluff

---

INSTAGRAM:
- Tone: expressive, relatable, slightly emotional
- Include emojis naturally
- Add 8–15 relevant hashtags at the end
- Make it feel personal and scroll-stopping

---

TIKTOK:
- Format as a spoken script
- First line = strong hook (must stop the scroll)
- Keep it fast-paced and conversational
- Use line breaks for delivery

---

Return ONLY valid JSON (no explanations):
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
      
      // Clean up excessive newlines for cleaner UI
      Object.keys(result).forEach(key => {
        result[key] = result[key].replace(/\n{3,}/g, '\n\n')
      })
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
