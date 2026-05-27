import SidebarToggle from "./SidebarToggle";
import { useDispatch, useSelector } from 'react-redux'
import { MoonIcon, SunIcon } from 'lucide-react'
import { toggleTheme } from '../../features/themeSlice'

function Header({ isSidebarOpen, setIsSidebarOpen }) {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    return (
        <header className="h-14 border-b border-slate-200 bg-white text-slate-900
                   dark:border-[#2a2a2a] dark:bg-[#212121] dark:text-white 
                   flex items-center px-4">

            <SidebarToggle
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <h1 className="ml-4 text-sm font-semibold">BotGPT</h1>
            <div className="flex-1 flex justify-end items-center gap-5">
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
            </div>
        </header>
    );
}

export default Header;