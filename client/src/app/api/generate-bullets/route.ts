import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    const { description, type } = await req.json();

    if (!description) {      
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    // Create request body - match interview bot's format
    const requestBody = {
      contents: [
        {
          parts: [{
            text: type === 'experience' 
              ? `Convert this work experience description into 3-4 professional bullet points that highlight achievements and impact. Make them concise and action-oriented. Each bullet point should start with a strong action verb and include measurable results where possible. Format each point on a new line starting with a bullet point (•). Description: ${description}`
              : `Convert this project description into 3-4 professional bullet points that highlight technical achievements and impact. Make them concise and action-oriented. Each bullet point should start with a strong action verb and include measurable results where possible. Format each point on a new line starting with a bullet point (•). Description: ${description}`
          }],
        },
      ],
    };

    // Use the exact same API endpoint and model as the interview bot
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate bullet points";

    // Split the response into bullet points and clean them up
    const bulletPoints = text
      .split('\n')
      .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
      .map(line => line.replace(/^[•-]\s*/, '').trim())
      .filter(line => line.length > 0);

    return NextResponse.json({ bulletPoints });
  } catch (error) {
    console.error('Error generating bullet points:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate bullet points' },
      { status: 500 }
    );
  }
} 