import { useChatContext } from "../../context/ChatContext";
import ChatHistoryList from "../sidebar/ChatHistoryList";

function Sidebar({ isSidebarOpen }) {
    const { chatHistory, activeChatId, createNewChat, selectChat } = useChatContext();
    return (
        <aside
            className={`
                bg-slate-100
                dark:bg-[#212121]
                border-r
                border-slate-200
                dark:border-[#2a2a2a]
                transition-all
                duration-300
                overflow-hidden
                ${isSidebarOpen ? "w-64" : "w-0"}
            `}
        >
            <div className="p-4">

                {/* New Chat Button */}
                <button
                    type="button"
                    onClick={createNewChat}
                    className="w-full 
                    bg-slate-200 hover:bg-slate-300 
                    dark:bg-[#2f2f2f] dark:hover:bg-[#3a3a3a] 
                    p-3 rounded-lg text-sm 
                    text-slate-900 dark:text-white transition"
                >
                    + New Chat
                </button>

                {chatHistory?.length > 0 && (
                    <div className="mt-6">
                        <h2 className="px-3 mb-2 text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                            Recents
                        </h2>
                        <ChatHistoryList
                            chats={chatHistory}
                            activeChatId={activeChatId}
                            onSelectChat={selectChat}
                        />
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;