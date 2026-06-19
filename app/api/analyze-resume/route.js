import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { resumeText } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert resume reviewer and career counselor. Analyze the following resume and provide:

1. **Overall Score** (out of 100)
2. **Strengths** (what's good, 3-4 points)
3. **Weaknesses** (what needs improvement, 3-4 points)
4. **Missing Skills** (based on current industry trends for this person's field)
5. **ATS Compatibility** (will it pass Applicant Tracking Systems? Yes/No with reason)
6. **Top 5 Specific Suggestions** (actionable improvements they can make today)

Be honest but constructive. Format your response in clean readable text with headers.

Resume:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}