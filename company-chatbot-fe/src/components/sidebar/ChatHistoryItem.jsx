function ChatHistoryItem({ chat, active, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`
                w-full text-left p-3 rounded-lg cursor-pointer
                transition-colors duration-200 text-sm truncate
                ${active ? "bg-slate-200 dark:bg-[#2a2a2a] font-semibold" : "bg-white dark:bg-[#111827] hover:bg-slate-200 dark:hover:bg-[#2f2f2f]"}
                ${active ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-white"}
            `}
        >
            {chat.title}
        </button>
    );
}

export default ChatHistoryItem;