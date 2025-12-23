import React from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { SquareLibrary } from "lucide-react";
import { ReuseButton } from "./MyButton";

const sideBarItems = [
  { routerLink: "/userHome", icon: "🏠", title: "Dashboard" },
  { routerLink: "/accountHistory", icon: "💸", title: "Transactions" },
  { routerLink: "/budgets", icon: "📊", title: "Budgets" },
  { routerLink: "/savings", icon: "📈", title: "Savings" },
  { routerLink: "/settings", icon: "⚙️", title: "Settings" },
];

const textVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05 }, // stagger each character
  }),
};

interface Props {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSideBar: React.FC<Props> = ({isOpen, setIsOpen}) => {

  return (
    <motion.div
    initial={{ width: 80 }}
    animate={{ width: isOpen ? 300 : 80 }}
    transition={{ duration: 0.65 }}
    className="fixed bg-gray-800 text-white h-full p-4 select-none shadow-lg z-40">

      <ReuseButton
      className={`flex items-center font-bold mb-6 cursor-pointer ${isOpen ? "w-full text-xl" : "w-12 justify-center"}`}
      href=""
      onClick={() => setIsOpen?.(!isOpen)}>
        <FaBars size={24} className="text-white" />
        {isOpen && (<span className="ml-2 flex items-center">
            <SquareLibrary />
            {Array.from("OsmondSolutions").map((char, i) => (
                <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={textVariant}>

                {char}
              </motion.span>
            ))}
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
            {isOpen && (
                <span className="text-lg flex">
                {Array.from(item.title).map((char, i) => (
                    <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}>

                    {char}
                    
                    </motion.span>
                ))}
                </span>
            )}
            </a>
        ))}
        <div className="fixed bottom-4"> 
          <motion.div
          initial={{ width: 50 }}
          animate={{ width: isOpen ? 260 : 50 }}
          transition={{ duration: 0.65 }}
          className=" items-center p-2 mt-auto border-t border-gray-700">
            
          </motion.div>
          <div className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer">
            <span className="text-2xl">👤</span>
            {isOpen && (<span className="ml-2 items-center">
            {Array.from("UserHome").map((char, i) => (
                <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={textVariant}>

                {char}
              </motion.span>
            
            ))}
              </span>
            )}
          </div>
        </div>
        </nav>
    </motion.div>
  );
};

export default LeftSideBar;
