import { House } from "lucide-react";
import ReuseButton from "../components/Button";

export function Navbar (){
    return <div className = "flex gap-10 lg:gap-20">
        <div className = "flex gap-4 items-center shrink-0">
            <ReuseButton intent="secondary">
                <div className="flex items-center gap-2">
                    <House />
                    <span>Home</span>
                </div>
            </ReuseButton>
        </div>
    </div> 
}