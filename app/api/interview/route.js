import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { role, experience, history, userAnswer } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt;

    if (!userAnswer) {
      prompt = `You are a technical interviewer conducting an interview for a ${role} position. The candidate is a ${experience} level candidate.

Ask the first interview question. It should be a good mix of technical knowledge relevant to the role. Be conversational and professional.

Just ask the question directly. Don't say "Question 1" or anything like that. Be natural, like a real interviewer.`;
    } else {
      prompt = `You are a technical interviewer for a ${role} position (${experience} level).

Conversation so far:
${history}

Candidate's latest answer: "${userAnswer}"

Do exactly two things:
1. Give brief feedback on their answer (2-3 lines max). Rate it as Good/Average/Needs Improvement.
2. Ask the next interview question (different topic/type from previous questions).

Format exactly like this:
**Feedback:** [your 2-3 line feedback]
**Rating:** [Good/Average/Needs Improvement]

**Next Question:** [your next question]`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}