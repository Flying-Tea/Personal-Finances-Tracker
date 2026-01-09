import LeftSideBar from "@/components/ui/SideBar"
import React from "react";
import { motion } from "framer-motion";
// import GridComponent from "@/components/AGGrid";
import TransactionsGrid from "@/components/TransactionGrid";


const AccountHistory: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return <div className="flex bg-slate-600 min-h-screen text-white select-none">
        <LeftSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <motion.div 
        initial={{ marginLeft: 80 }} 
        animate={{ marginLeft: isOpen ? 300 : 80 }} 
        transition={{ duration: 0.65 }} 
        className="flex-1 overflow-auto">

        <div className = "flex bg-gray-800 shadow-md p-4 items-center">
            <h1 className="text-3xl font-bold">Transaction History</h1>
        </div>

        <div className="p-4">
            <TransactionsGrid />
        </div>
            

        </motion.div>
    </div>
}

export default AccountHistory;