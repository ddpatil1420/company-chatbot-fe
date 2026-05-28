import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [panelQuestions, setPanelQuestions] = useState([]);
    const [panelAnswers, setPanelAnswers] = useState({});

    const createNewChat = () => {
        setActiveChatId(null);
        setPanelQuestions([]);
        setPanelAnswers({});
    };

    const selectChat = (chatId) => {
        setActiveChatId(chatId);
    };

    const updatePanelAnswer = (questionText, answerText) => {
        if (!questionText) return;

        const cleanTarget = questionText.trim().toLowerCase().replace(/[?.]/g, "");

        setPanelQuestions((prevQuestions) => {
            const matchedQuestion = prevQuestions.find((q) => {
                const cleanSource = q.question.trim().toLowerCase().replace(/[?.]/g, "");
                return cleanSource === cleanTarget;
            });

            if (matchedQuestion) {
                setPanelAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [matchedQuestion.id]: answerText,
                }));
            } else {
                console.warn(`⚠️ No sidebar field match found for: "${questionText}"`);
            }
            return prevQuestions;
        });
    };

    const addChat = (message, response) => {
        const piecesToAdd = [];
        if (message && message.trim() !== "") {
            piecesToAdd.push({ role: "user", text: message });
        }
        if (response && response.trim() !== "") {
            piecesToAdd.push({ role: "assistant", text: response });
        }

        if (!chatHistory.length || !activeChatId) {
            const newChat = {
                id: Date.now(),
                title: message || response,
                messages: piecesToAdd,
                lastMessage: response,
                response,
                createdAt: new Date(),
            };

            setChatHistory((prev) => [newChat, ...prev]);
            setActiveChatId(newChat.id);
            return;
        }

        setChatHistory((prev) =>
            prev.map((chat) =>
                chat.id === activeChatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, ...piecesToAdd],
                        lastMessage: response,
                        response,
                    }
                    : chat
            )
        );
    };

    return (
        <ChatContext.Provider
            value={{
                chatHistory,
                addChat,
                activeChatId,
                createNewChat,
                selectChat,
                panelQuestions,
                setPanelQuestions,
                panelAnswers,
                setPanelAnswers,
                updatePanelAnswer,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);