import ChatHistoryItem from "./ChatHistoryItem";

function ChatHistoryList({ chats, activeChatId, onSelectChat }) {
    return (
        <div className="mt-4 space-y-1">
            {chats.map((chat) => (
                <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    active={chat.id === activeChatId}
                    onSelect={() => onSelectChat(chat.id)}
                />
            ))}
        </div>
    );
}

export default ChatHistoryList;