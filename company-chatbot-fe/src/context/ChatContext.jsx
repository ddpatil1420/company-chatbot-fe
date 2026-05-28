import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    const createNewChat = () => {
        setActiveChatId(null);
    };

    const selectChat = (chatId) => {
        setActiveChatId(chatId);
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
                        messages: [
                            ...chat.messages,
                            ...piecesToAdd
                        ],
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
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);