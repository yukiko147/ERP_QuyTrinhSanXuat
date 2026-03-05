import { useState } from "react"
import Header from "../compoments/layout/Header"
import Main from "../compoments/layout/Main"
import Sidebar from "../compoments/layout/Sidebar"
import { Outlet } from "react-router-dom"


const DashBoard = () => {

    const [isCollapsed, setIsCollapsed] = useState(false)
    const handleCollapsed = (value) => {
        setIsCollapsed(value)
    }

    return (
        <>
            <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100">
                <div className="flex min-h-screen overflow-hidden">
                    <Sidebar onToggleCollapse={handleCollapsed} />

                    <div className={`flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-16' : `pl-56`}`}>
                        <Header />

                        <Main>
                            <Outlet />
                        </Main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard