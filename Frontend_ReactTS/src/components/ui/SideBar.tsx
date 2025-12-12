import { SquareLibrary } from "lucide-react";

export interface BarItems {
    routerLink: string;
    icon: string;
    title: string;
}

const sideBarItems: BarItems[] = [
    { routerLink: "/dashboard", icon: "🏠", title: "Dashboard" },
    { routerLink: "/transactions", icon: "💸", title: "Transactions" },
    { routerLink: "/budgets", icon: "📊", title: "Budgets" },
    { routerLink: "/reports", icon: "📈", title: "Reports" },
    { routerLink: "/settings", icon: "⚙️", title: "Settings" },
]


const LeftSidebar = () => {
    return <div className="fixed w-64 bg-gray-800 text-white h-full p-4 transition-all duration-300 ">
        <div>
            <a href="/"><h1 className="flex text-2xl font-bold mb-2"><SquareLibrary/>OsmondSolutions</h1></a>
        </div>
        <div>
            {sideBarItems.map((item) => (
                <a 
                    key={item.title}
                    href={item.routerLink}
                    className="flex items-center gap-3 p-1 mb-2 rounded hover:bg-gray-700 transition-colors"
                >
                    <span className="text-2x1">{item.icon}</span>
                    <span className="text-lg">{item.title}</span>
                </a>
            ))}
        </div>
        <div>
            {/* Put user account at bottom */}
        </div>
    </div>
}

export default LeftSidebar;