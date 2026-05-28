import { useChatContext } from "../../context/ChatContext";

function QuestionPanel() {
    const { panelQuestions, panelAnswers, setPanelAnswers } = useChatContext();

    const handleChange = (id, value) => {
        setPanelAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <aside className="w-80 border-l border-slate-200 dark:border-[#2a2a2a] bg-slate-50 dark:bg-[#1a1a1a] p-4 overflow-y-auto">
            <h2 className="text-sm font-semibold mb-4 text-slate-700 dark:text-gray-300">
                Interview Milestones
            </h2>

            <div className="space-y-4">
                {panelQuestions.map((q) => (
                    <div key={q.id}>
                        <label className="block text-xs mb-1 text-gray-600 dark:text-gray-400 font-medium">
                            {q.question}
                        </label>

                        <input
                            type="text"
                            disabled
                            value={panelAnswers[q.id] || ""}
                            onChange={(e) => handleChange(q.id, e.target.value)}
                            className="
                                w-full px-3 py-2
                                rounded-lg text-sm
                                bg-gray-100 dark:bg-[#202020] text-gray-500
                                border border-slate-200 dark:border-[#3a3a3a]
                                focus:outline-none
                            "
                        />
                    </div>
                ))}

                {panelQuestions.length === 0 && (
                    <p className="text-xs text-gray-400 italic text-center pt-8">
                        Send "Hi" to begin the screening evaluation form.
                    </p>
                )}
            </div>
        </aside>
    );
}

export default QuestionPanel;