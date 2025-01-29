import { useState } from 'react'



const Sidbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition duration-200 ease-in-out`}
            >
                {/* Sidebar Header */}
                <div className="text-white flex items-center space-x-2 px-4">
                    <h1 className="text-2xl font-extrabold">Logo</h1>
                </div>

                {/* Sidebar Navigation */}
                <nav>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Home
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        About
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Services
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                        Contact
                    </a>
                </nav>
            </div>

            {/* Overlay for small screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-4">
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden bg-gray-800 text-white p-2 rounded"
                >
                    {isSidebarOpen ? 'Close' : 'Open'} Sidebar
                </button>

                <h1 className="text-2xl font-bold">Main Content</h1>
                <p>This is the main content area.</p>
            </main>
        </div>
    )
}

export default Sidbar