import { Home, Signature, SquareLibrary, User } from "lucide-react"
import React from "react"
import { ReuseButton } from "./MyButton"
import SignUpModal from "../layouts/SignUpModal"

export function HomeNavBar(){
    const [open, setOpen] = React.useState(false);
    return <nav className = "flex gap-10 lg:gap-20 fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/20 backdrop-blur-sm border-b">
        <div>
            <h1 className="flex text-2xl font-bold ml-10 lg:ml-0 p-4"><SquareLibrary></SquareLibrary>OsmondSolutions</h1>
        </div>
            <div className = "flex ml-auto gap-4 items-center shrink-0 mr-10 lg:mr-5">
                <ReuseButton intent="primaryButton" href="/" className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500">
                    <Home />
                    <span>Home</span>
                </ReuseButton>
                <ReuseButton intent="primaryButton" href="/about" className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500">
                    <User />
                    <span>About Us</span>
                </ReuseButton>
                <ReuseButton intent="primaryButton" onClick={() => setOpen(true)} className="flex items-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500">
                    <Signature />
                    <span>Sign Up/In</span>
                </ReuseButton>
                <SignUpModal open={open} onOpenChange={setOpen}></SignUpModal>
            </div>

    </nav> 
}  