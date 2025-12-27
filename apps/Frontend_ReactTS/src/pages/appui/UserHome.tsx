import LeftSideBar from "@/components/ui/SideBar"
import React from "react";
import { motion } from "framer-motion";
import StatCards3 from "@/components/layouts/statcard";
import { FaBug } from "react-icons/fa";

const cards = [{ // later connect to accounts and user input data
    title: "Balance",
    value: "$ N/A",
    icon: <FaBug />,
    colors: { bgColor: "bg-slate-800 text-white", iconColor: "text-blue-600" },
    metricDelta: "N/A",
    positiveMetric: true,
},
{
    title: "Monthly Expenses",
    value: "$ N/A",
    icon: <FaBug />,
    colors: { bgColor: "bg-slate-800 text-white", iconColor: "text-green-600" },
    metricDelta: "N/A",
    positiveMetric: true,
},
{
    title: "Savings",
    value: "$ N/A",
    icon: <FaBug />,
    colors: { bgColor: "bg-slate-800 text-white", iconColor: "text-yellow-600" },
    metricDelta: "N/A",
    positiveMetric: true,
},
{
    title: "Investments",
    value: "$ N/A",
    icon: <FaBug />,
    colors: { bgColor: "bg-slate-800 text-white", iconColor: "text-purple-600" },
    metricDelta: "N/A",
    positiveMetric: true,
}
]

const UserHome: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return <div className="flex bg-slate-600 min-h-screen text-white select-none">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <motion.div 
        initial={{ marginLeft: 80 }} 
        animate={{ marginLeft: isOpen ? 300 : 80 }} 
        transition={{ duration: 0.65 }} 
        className="flex-1 overflow-auto">

        <div className = "flex bg-gray-800 shadow-md p-4 items-center">
            <h1 className="text-3xl font-bold pr-10">User Dashboard</h1>
            <div className="flex bg-amber-600 shadow-md p-3 items-center rounded-2xl">
                <p className="ml-auto">Warning this is a product Demo all saved data will be deleted 2 hours after creation.</p>
            </div>
        </div>

        <div className="p-8">
            <StatCards3 cards={cards} showIcons={false}/>
        </div>

        </motion.div>
    </div>
}

export default UserHome;