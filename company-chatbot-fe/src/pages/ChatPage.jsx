import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/layout/ChatWindow";
import { useDispatch } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { ChatProvider } from "../context/ChatContext";

function ChatPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch]);

    return (
        <ChatProvider>
            <div className="h-screen flex flex-col bg-white text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-white">
                <Header
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <div className="flex flex-1 overflow-hidden min-w-0">
                    <Sidebar isSidebarOpen={isSidebarOpen} />
                    <ChatWindow />
                </div>
            </div>
        </ChatProvider>
    );
}

export default ChatPage;