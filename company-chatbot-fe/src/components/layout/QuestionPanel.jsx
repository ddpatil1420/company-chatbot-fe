import { useEffect, useState } from "react";

function QuestionPanel() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // simulate backend fetch
    useEffect(() => {
        // Replace this with API call
        const fetchedQuestions = [
            { id: 1, question: "What is your name?" },
            { id: 2, question: "What is your email?" },
            { id: 3, question: "Your experience?" },
            { id: 4, question: "Favorite tech stack?" },
        ];

        setQuestions(fetchedQuestions);
    }, []);

    const handleChange = (id, value) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <aside className="w-80 border-l border-slate-200 dark:border-[#2a2a2a] bg-slate-50 dark:bg-[#1a1a1a] p-4 overflow-y-auto">

            <h2 className="text-sm font-semibold mb-4 text-slate-700 dark:text-gray-300">
                Fill Details
            </h2>

            <div className="space-y-4">
                {questions.map((q) => (
                    <div key={q.id}>
                        <label className="block text-xs mb-1 text-gray-600 dark:text-gray-400">
                            {q.question}
                        </label>

                        <input
                            type="text"
                            value={answers[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            className="
                w-full px-3 py-2
                rounded-lg text-sm
                bg-white dark:bg-[#2a2a2a]
                border border-slate-300 dark:border-[#3a3a3a]
                focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-slate-500
              "
                        />
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default QuestionPanel;
