export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">
        <span className="gradient-text">AI Placement Copilot</span>
      </h1>
      <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
        Your AI-powered placement preparation assistant. Analyze your resume,
        practice mock interviews, and match with the perfect job.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <a href="/resume-analyzer" className="glass-card p-6 hover:scale-105 transition-all block">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-bold mb-2">Resume Analyzer</h3>
          <p className="text-gray-400">Upload your resume and get instant AI feedback on improvements, missing skills, and ATS compatibility.</p>
        </a>

        <a href="/mock-interview" className="glass-card p-6 hover:scale-105 transition-all block">
          <div className="text-4xl mb-4">🎤</div>
          <h3 className="text-xl font-bold mb-2">Mock Interview</h3>
          <p className="text-gray-400">Practice with AI interviewer. Get questions based on your target role and instant feedback.</p>
        </a>

        <a href="/job-matcher" className="glass-card p-6 hover:scale-105 transition-all block">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-2">Job Matcher</h3>
          <p className="text-gray-400">Paste a job description and your resume to get a match score with improvement suggestions.</p>
        </a>
      </div>
    </div>
  );
}