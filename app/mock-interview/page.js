'use client';
import { useState } from 'react';

export default function MockInterview() {
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('fresher');
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    if (!role.trim()) return;
    setLoading(true);
    setStarted(true);
    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, experience }),
      });
      const data = await res.json();
      setMessages([{ role: 'interviewer', text: data.response }]);
    } catch (err) {
      setMessages([{ role: 'interviewer', text: 'Error starting interview.' }]);
    }
    setLoading(false);
  };

  const sendAnswer = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    const history = newMessages.map(m =>
      m.role === 'interviewer' ? 'Interviewer: ' + m.text : 'Candidate: ' + m.text
    ).join('\n');

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, experience, history, userAnswer: userInput }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'interviewer', text: data.response }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'interviewer', text: 'Error. Try again.' }]);
    }
    setLoading(false);
  };

  if (!started) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-2 gradient-text">Mock Interview</h1>
        <p className="text-gray-400 mb-6">Practice with an AI interviewer tailored to your target role</p>

        <div className="glass-card p-6 max-w-md">
          <label className="block text-sm text-gray-400 mb-2">Target Role</label>
          <input
            type="text"
            className="w-full bg-transparent border border-gray-700 rounded-lg p-3 text-white mb-4 focus:outline-none focus:border-purple-500"
            placeholder="e.g. Frontend Developer, Data Analyst"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <label className="block text-sm text-gray-400 mb-2">Experience Level</label>
          <select
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white mb-4"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="fresher">Fresher</option>
            <option value="1-2 years">1-2 Years</option>
            <option value="3-5 years">3-5 Years</option>
          </select>

          <button onClick={startInterview} disabled={loading} className="btn-primary w-full">
            {loading ? 'Starting...' : 'Start Interview'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 gradient-text">Mock Interview - {role}</h1>

      <div className="glass-card p-6 mb-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-purple-600/30 text-purple-100'
                : 'bg-gray-800 text-gray-200'
            }`}>
              <p className="text-xs text-gray-500 mb-1">
                {msg.role === 'user' ? 'You' : '🤖 Interviewer'}
              </p>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && <p className="text-gray-500">Thinking...</p>}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          className="flex-1 bg-transparent border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
          placeholder="Type your answer..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendAnswer()}
        />
        <button onClick={sendAnswer} disabled={loading} className="btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}