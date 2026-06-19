import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { resume, jobDescription } = await request.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert job matching AI. Compare the following resume with the job description and provide:

1. **Match Score** (give an honest percentage)
2. **Matching Skills** (skills in resume that match the job)
3. **Missing Skills** (skills required by job but NOT in resume)
4. **Experience Gap Analysis** (does experience level match?)
5. **Action Plan** (what to do in next 2 weeks to improve match)
6. **Verdict: Should Apply?** (Yes/Maybe/No with reason)

Be brutally honest. Format in clean readable text.

**Resume:**
${resume}

**Job Description:**
${jobDescription}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
