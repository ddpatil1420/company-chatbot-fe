function SidebarToggle({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-slate-100 text-slate-900 hover:bg-slate-200 transition dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
            ☰
        </button>
    );
}

export default SidebarToggle;