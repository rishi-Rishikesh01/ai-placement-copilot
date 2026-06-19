'use client';
import { useState } from 'react';

export default function JobMatcher() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!resume.trim() || !jobDescription.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/match-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription }),
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setAnalysis('Error matching. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 gradient-text">Job Matcher</h1>
      <p className="text-gray-400 mb-6">Compare your resume against any job description</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="glass-card p-4">
          <label className="block text-sm text-gray-400 mb-2">Your Resume</label>
          <textarea
            className="w-full h-48 bg-transparent border border-gray-700 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-purple-500"
            placeholder="Paste your resume text here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div className="glass-card p-4">
          <label className="block text-sm text-gray-400 mb-2">Job Description</label>
          <textarea
            className="w-full h-48 bg-transparent border border-gray-700 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-purple-500"
            placeholder="Paste the job description from LinkedIn/Naukri..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleMatch}
        disabled={loading || !resume.trim() || !jobDescription.trim()}
        className="btn-primary disabled:opacity-50"
      >
        {loading ? 'Matching...' : 'Match & Analyze'}
      </button>

      {analysis && (
        <div className="glass-card p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Match Results</h2>
          <div className="text-gray-300 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
}
