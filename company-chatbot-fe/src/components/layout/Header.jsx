import { useState } from "react";
import SidebarToggle from "./SidebarToggle";
import { useDispatch, useSelector } from 'react-redux'
import { MoonIcon, SunIcon } from 'lucide-react'
import { toggleTheme } from '../../features/themeSlice'

function Header({ isSidebarOpen, setIsSidebarOpen }) {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);

    // ✅ NEW STATE (can be replaced with Redux later)
    const [user, setUser] = useState(null);

    // ✅ Simulate login
    const handleLogin = () => {
        const fakeUser = {
            firstName: "Darshan",
            lastName: "Patil"
        };
        setUser(fakeUser);
    };

    // ✅ Generate initials
    const getInitials = (first, last) => {
        return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
    };

    // ✅ Random background color
    const getAvatarColor = (name) => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
        ];
        const index = name.length % colors.length;
        return colors[index];
    };

    return (
        <header className="h-14 border-b border-slate-200 bg-white text-slate-900
            dark:border-[#2a2a2a] dark:bg-[#212121] dark:text-white 
            flex items-center px-4"
        >

            <SidebarToggle
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <h1 className="ml-4 text-sm font-semibold">BotGPT</h1>

            <div className="flex-1 flex justify-end items-center gap-5">

                {/* ✅ Theme Toggle */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="size-8 flex items-center justify-center bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 shadow rounded-lg transition-colors duration-200"
                >
                    {
                        theme === "light"
                            ? <MoonIcon className="size-7" />
                            : <SunIcon className="size-7 text-yellow-400" />
                    }
                </button>

                {/* ✅ Login / Avatar */}
                {!user ? (
                    <button
                        onClick={handleLogin}
                        className="
                            px-3 py-1.5 text-sm rounded-lg
                            bg-slate-200 hover:bg-slate-300
                            dark:bg-zinc-800 dark:hover:bg-zinc-700
                            transition
                        "
                    >
                        Login
                    </button>
                ) : (
                    <div
                        title={`${user.firstName} ${user.lastName}`}
                        className={`
                            size-9 flex items-center justify-center
                            rounded-full text-white text-sm font-semibold
                            ${getAvatarColor(user.firstName)}
                        `}
                    >
                        {getInitials(user.firstName, user.lastName)}
                    </div>
                )}

            </div>
        </header>
    );
}

export default Header;