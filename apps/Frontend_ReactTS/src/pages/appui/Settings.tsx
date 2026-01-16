import LeftSideBar from "@/components/ui/SideBar"
import React from "react";
import { motion } from "framer-motion";
import { SettingsIcon } from "lucide-react";

const Settings: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return <div className="flex bg-slate-600 min-h-screen text-white select-none">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <motion.div 
        initial={{ marginLeft: 80 }} 
        animate={{ marginLeft: isOpen ? 300 : 80 }} 
        transition={{ duration: 0.65 }} 
        className="flex-1 overflow-auto">

        <div className = "flex bg-gray-800 shadow-md p-4 items-center">
            <h1 className="flex text-3xl font-bold">
                <SettingsIcon></SettingsIcon> Settings
            </h1>
        </div>

        <div className="p-8">
            <div className="bg-amber-200 p-10 rounded-lg shadow-md max-w-6xl border place-items-start mx-auto text-black">
                <h1 className="text-3xl font-bold">"I've decided to prioritize core functionality for the initial release to ensure stability and performance. This feature didn't make it into the first version, but it's on my roadmap for a future update."</h1>
            </div>
        </div>

        </motion.div>
    </div>
}

export default Settings;