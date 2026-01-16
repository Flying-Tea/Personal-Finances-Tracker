import { Home, Signature, SquareLibrary, User, Menu, X } from "lucide-react";
import React from "react";
import { ReuseButton } from "./MyButton";
import SignUpModal from "../layouts/SignUpModal";

export function HomeNavBar() {
    const [openModal, setOpenModal] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/20 backdrop-blur-sm border-b transition-all duration-300">
        <div className="flex items-center justify-between px-6 lg:px-10">
        <div>
            <h1 className="flex text-2xl font-bold ml-10 lg:ml-0 p-4"><SquareLibrary></SquareLibrary>OsmondSolutions</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
            <ReuseButton
            intent="primaryButton"
            href="/"
            className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500"
            >
                <Home /> <span>Home</span>
            </ReuseButton>
            <ReuseButton
            intent="primaryButton"
            href="/about"
            className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500"
            >
                <User /> <span>About Us</span>
            </ReuseButton>
                <ReuseButton
                intent="primaryButton"
                onClick={() => setOpenModal(true)}
                className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500"
                >
                <Signature /> <span>Sign Up/In</span>
            </ReuseButton>
            <SignUpModal open={openModal} onOpenChange={setOpenModal} />
        </div>

        <button
            className="md:hidden flex items-center p-2 rounded hover:bg-gray-700 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/90 backdrop-blur-sm border-t border-gray-700">
            <div className="flex flex-col gap-2 p-4">
            <ReuseButton
                intent="primaryButton"
                href="/"
                className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500 w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
            >
                <Home /> <span>Home</span>
            </ReuseButton>
            <ReuseButton
                intent="primaryButton"
                href="/about"
                className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500 w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
            >
                <User /> <span>About Us</span>
            </ReuseButton>
            <ReuseButton
                intent="primaryButton"
                onClick={() => {
                setOpenModal(true);
                setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500 w-full justify-center"
            >
                <Signature /> <span>Sign Up/In</span>
            </ReuseButton>
            </div>
        </div>
        )}
    </nav>
    );
}
