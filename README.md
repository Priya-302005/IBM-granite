// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchLessons, generateAI, saveProgress } from './services/api';
import LessonCard from './components/LessonCard';

export default function App() {
  const [lessons, setLessons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLessons().then(setLessons);
  }, []);

  async function handleOpen(lesson, opts = {}) {
    setSelected(lesson);
    setAiResponse('');
    if (opts.ai) {
      setLoading(true);
      const prompt = `Explain key ideas of the lesson titled "${lesson.title}". Provide simple examples and one short quiz question.`;
      const { content } = await generateAI(prompt, 'tutor');
      setAiResponse(content || 'No response');
      setLoading(false);
    }
  }

  async function markComplete() {
    if (!selected) return;
    await saveProgress({ userId: 1, lessonId: selected.id, completed: 1 });
    alert('Progress saved');
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">EduTutor AI</h1>
        <p className="text-gray-600">Personalized learning with generative AI</p>
      </header>

      <main className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2">
          <div className="grid grid-cols-1 gap-4">
            {lessons.map(l => <LessonCard key={l.id} lesson={l} onOpen={handleOpen} />)}
          </div>
        </section>

        <aside className="p-4 bg-white rounded-2xl shadow-md">
          {selected ? (
            <>
              <h2 className="text-xl font-semibold">{selected.title}</h2>
              <p className="text-sm text-gray-600">Level: {selected.level}</p>
              <div className="mt-3">
                <button className="px-3 py-1 rounded-lg bg-green-600 text-white" onClick={markComplete}>Mark Complete</button>
              </div>

              <div className="mt-4">
                <h3 className="font-medium">AI Tutor</h3>
                {loading ? <p>Thinking...</p> : <pre className="whitespace-pre-wrap">{aiResponse || 'Press "Ask AI" on a lesson'}</pre>}
              </div>
            </>
          ) : (
            <p className="text-gray-600">Select a lesson to view details or ask AI for a summary.</p>
          )}
        </aside>
      </main>
    </div>
  );
}
