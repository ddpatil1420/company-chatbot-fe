import { useEffect, useState } from "react";
import { sendMessage, initChatSession } from "../../services/chatService";
import { useChatContext } from "../../context/ChatContext";

function ChatWindow() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode] = useState(true);
    const [sessionId, setSessionId] = useState(null);
    const { addChat, activeChatId, chatHistory, setPanelQuestions, updatePanelAnswer } = useChatContext();
    const [currentQuestionInFlight, setCurrentQuestionInFlight] = useState("");
    const activeChat = chatHistory.find((chat) => chat.id === activeChatId);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    useEffect(() => {
        if (!activeChatId) {
            setResponse("");
            setMessage("");
            setSessionId(null);
        }
    }, [activeChatId]);

    const formatBotResponse = (resPayload) => {
        if (Array.isArray(resPayload)) {
            return resPayload[0] ? String(resPayload[0]).trim() : "";
        }
        return resPayload ? String(resPayload).trim() : "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim() || loading) return;

        const isFirstMessage = !activeMessages || activeMessages.length === 0;
        const userSubmittedText = message;
        setMessage("");

        try {
            setLoading(true);
            if (isFirstMessage) {
                const data = await initChatSession("fullstack_developer");
                setSessionId(data.session_id);

                let firstQuestionStr = "";

                if (data.all_questions) {
                    const formattedForPanel = data.all_questions.map((item, index) => {
                        const qText = typeof item === 'object' && item !== null ? item.question : item;
                        return {
                            id: index + 1,
                            question: String(qText)
                        };
                    });
                    setPanelQuestions(formattedForPanel);
                }

                if (data.question) {
                    firstQuestionStr = typeof data.question === 'object' && data.question !== null
                        ? String(data.question.question)
                        : String(data.question);
                }

                addChat(userSubmittedText, firstQuestionStr.trim());
                setResponse(firstQuestionStr.trim());
                setCurrentQuestionInFlight(firstQuestionStr.trim());

            } else {
                const questionBeingAnswered = currentQuestionInFlight;

                const data = await sendMessage(userSubmittedText, sessionId);

                if (!data.is_policy && questionBeingAnswered) {
                    updatePanelAnswer(questionBeingAnswered, userSubmittedText);
                }

                if (Array.isArray(data.response)) {
                    if (data.response[0]) {
                        addChat(userSubmittedText, String(data.response[0]).trim());
                    }

                    if (data.response[1]) {
                        const nextQ = String(data.response[1]).trim();
                        addChat("", nextQ);
                        setCurrentQuestionInFlight(nextQ);
                        setResponse(nextQ);
                    } else {
                        setResponse(String(data.response[0]).trim());
                    }
                } else {
                    const singleResponseStr = String(data.response).trim();

                    addChat(userSubmittedText, singleResponseStr);
                    setResponse(singleResponseStr);
                    setCurrentQuestionInFlight(singleResponseStr);
                }
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setResponse("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const renderChatInput = (maxWidthClass) => (
        <form
            onSubmit={handleSubmit}
            noValidate
            className={`w-full ${maxWidthClass} mx-auto`}
        >
            <div className="flex flex-col sm:flex-row items-center gap-3 min-w-0
                bg-[#f4f4f4] dark:bg-[#2f2f2f]
                border border-gray-300 dark:border-[#2a2a2a]
                rounded-full px-4 py-2
                transition-all duration-200
                focus-within:ring-[1px]
                focus-within:ring-gray-200 
                dark:focus-within:ring-gray-700"
            >
                <input
                    type="text"
                    placeholder="Ask anything"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent outline-none 
                        text-black dark:text-white 
                        placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />

                <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className={`w-full sm:w-auto ml-0 sm:ml-3 flex-shrink-0
                        px-4 py-1.5 rounded-full font-medium
                        transition duration-200
                        ${!message.trim()
                            ? "bg-gray-200 text-gray-400 dark:bg-[#3a3a3a] dark:text-gray-500 cursor-not-allowed pointer-events-none"
                            : "bg-[#171717] text-white dark:bg-white dark:text-black hover:bg-[#2a2a2a] dark:hover:bg-gray-200"}
                    `}
                >
                    {loading ? "..." : "Send"}
                </button>
            </div>
        </form>
    );

    const activeMessages = activeChat?.messages ?? [];

    return (
        <main
            className="relative flex-1 min-w-0 min-h-0 flex flex-col
                bg-white dark:bg-[#212121]
                transition-colors duration-300 w-full"
        >
            {activeMessages.length > 0 ? (
                <div className="w-full h-full flex flex-col pb-24">
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                        <div className="w-full max-w-3xl mx-auto flex flex-col space-y-4">
                            {activeMessages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`w-fit max-w-[85%] rounded-3xl px-5 py-4 whitespace-pre-wrap text-sm shadow-sm transition-all duration-200 ${msg.role === "user"
                                        ? "self-end bg-sky-500 text-white dark:bg-sky-400 dark:text-slate-900"
                                        : "self-start bg-[#f4f4f4] dark:bg-[#2f2f2f] text-black dark:text-white"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#212121] z-10">
                        {renderChatInput("max-w-3xl")}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <div className="text-center mb-8">
                        <p className="text-lg text-slate-900 dark:text-gray-100">
                            What can I help with?
                        </p>
                    </div>

                    {renderChatInput("max-w-2xl")}
                </div>
            )}
        </main>
    );
}

export default ChatWindow;