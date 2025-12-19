import CustomFooter from "@/components/layouts/Footer";
import { HomeNavBar } from "@/components/ui/HomeNav";

export default function About() {
    return (
        <div className="select-none">
            <div className="bg-gray-900 text-white">
                <HomeNavBar />
            </div>
            <div className="min-h-screen bg-gray-800 text-black flex flex-col items-center justify-center p-8 space-y-6 ">
                <div className="bg-blue-200 p-10 rounded-lg shadow-md max-w-6xl border place-items-start mx-auto">
                    <h1 className="text-4xl font-bold mb-6">About OsmondSolutions</h1>
                    <p className="max-w-3xl text-center mb-4">
                        OsmondSolutions is dedicated to providing users with a comprehensive personal finance management tool. Our mission is to empower individuals to take control of their financial health through intuitive design and powerful features.
                    </p>
                    <p className="max-w-3xl text-center mb-4">
                        Founded in 2025, OsmondSolutions was created by a single software developer who recognized the need for a user-friendly platform to help people manage their spending, track expenses, and achieve their financial goals.
                    </p>
                    <p className="max-w-3xl text-center mb-4">
                        Our platform offers a range of features including expense tracking, budgeting tools, financial reporting, and more. We are committed to continuous improvement and regularly update our application based on user feedback and the latest industry trends.
                    </p>
                    <p className="max-w-3xl text-center">
                        At OsmondSolutions, we believe that everyone deserves access to tools that can help them make informed financial decisions. We are passionate about helping our users build a secure financial future.
                    </p>
                </div>
            </div>
            <div className=" m-0 p-0">
                <CustomFooter/>
            </div>
        </div>
    );
}   