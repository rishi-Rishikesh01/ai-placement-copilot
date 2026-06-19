'use client';
import { useState } from 'react';

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setAnalysis('Error analyzing resume. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 gradient-text">Resume Analyzer</h1>
      <p className="text-gray-400 mb-6">Paste your resume text below and get instant AI feedback</p>

      <div className="glass-card p-6 mb-6">
        <textarea
          className="w-full h-64 bg-transparent border border-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-purple-500"
          placeholder="Paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeText.trim()}
          className="btn-primary mt-4 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {analysis && (
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
          <div className="text-gray-300 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}