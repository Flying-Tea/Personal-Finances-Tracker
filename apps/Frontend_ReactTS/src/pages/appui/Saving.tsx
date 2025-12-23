import LeftSideBar from "@/components/ui/SideBar"
import React from "react";
import { motion } from "framer-motion";

const Saving: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return <div className="flex bg-slate-600 min-h-screen text-white select-none">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <motion.div 
        initial={{ marginLeft: 80 }} 
        animate={{ marginLeft: isOpen ? 300 : 80 }} 
        transition={{ duration: 0.65 }} 
        className="flex-1 overflow-auto">

        <div className = "flex bg-gray-800 shadow-md p-4 items-center">
            <h1 className="text-3xl font-bold">Savings</h1>
        </div>

        <div className="p-8">
            
        </div>

        </motion.div>
    </div>
}

export default Saving;