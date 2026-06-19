import './globals.css';

export const metadata = {
  title: 'AI Placement Copilot',
  description: 'Your AI-powered placement preparation assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="m-4 p-4 flex items-center justify-between" style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px'}}>
          <a href="/" className="text-xl font-bold gradient-text">
            AI Placement Copilot
          </a>
          <div className="flex gap-4">
            <a href="/" className="text-gray-400 hover:text-white px-3 py-1 rounded-lg transition-all">Home</a>
            <a href="/resume-analyzer" className="text-gray-400 hover:text-white px-3 py-1 rounded-lg transition-all">Resume Analyzer</a>
            <a href="/mock-interview" className="text-gray-400 hover:text-white px-3 py-1 rounded-lg transition-all">Mock Interview</a>
            <a href="/job-matcher" className="text-gray-400 hover:text-white px-3 py-1 rounded-lg transition-all">Job Matcher</a>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}