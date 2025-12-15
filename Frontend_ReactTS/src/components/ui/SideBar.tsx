import React from "react";
import { SquareLibrary } from "lucide-react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { ReuseButton } from "./Button";

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

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
        initial={{ width: 60 }}
        animate={{ width: isOpen ? 300 : 80 }}
        transition={{ duration: 0.4 }}
        className="fixed bg-gray-800 text-white h-full p-4 transition-all duration-300 shadow-lg">

        <ReuseButton
        className={`flex items-center font-bold mb-6 cursor-pointer ${isOpen ? "w-full text-xl" : "w-12 justify-center"}`}
        href=""
        onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={24} className="text-white" />
        {isOpen && (
            <span className="ml-2 flex items-center">
                <SquareLibrary/>OsmondSolutions
            </span>
        )}
        </ReuseButton>
        
        <nav className="flex flex-col gap-4">
            {sideBarItems.map((item) => (
                <a 
                    key={item.title}
                    href={item.routerLink}
                    className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition-colors cursor-pointer">
                
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-lg">{isOpen && <div>{item.title}</div>}</span>
                </a>
            ))}
        </nav>
    </motion.div>
  );
};

export default LeftSideBar;