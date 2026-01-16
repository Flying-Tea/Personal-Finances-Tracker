import CustomFooter from "@/components/layouts/Footer";
import { HomeNavBar } from "@/components/ui/HomeNav";
import HomeBg from '../assets/HomeBg.jpg';

export default function About() {
    return (
    <div className="min-h-screen text-white select-none">
        <div className="relative h-[800px] bg-fixed bg-cover bg-center" style={{ backgroundImage: `url(${HomeBg})` }}>
            
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10">
            <HomeNavBar />

            <div className="flex flex-col items-center justify-center h-full px-8">
                <div className="bg-blue-200 p-10 rounded-lg shadow-md max-w-6xl mx-auto text-black text-center">
                    <h1 className="text-4xl font-bold mb-6 mt-10">About OsmondSolutions</h1>
                    <p className="max-w-3xl mx-auto mb-4">
                    OsmondSolutions is dedicated to providing users with a comprehensive personal finance management tool. Our mission is to empower individuals to take control of their financial health through intuitive design and powerful features.
                    </p>
                    <p className="max-w-3xl mx-auto mb-4">
                    Founded in 2025, OsmondSolutions was created by a single software developer who recognized the need for a user-friendly platform to help people manage their spending, track expenses, and achieve their financial goals.
                    </p>
                    <p className="max-w-3xl mx-auto mb-4">
                    Our platform offers a range of features including expense tracking, budgeting tools, financial reporting, and more. We are committed to continuous improvement and regularly update our application based on user feedback and the latest industry trends.
                    </p>
                    <p className="max-w-3xl mx-auto">
                    At OsmondSolutions, we believe that everyone deserves access to tools that can help them make informed financial decisions. We are passionate about helping our users build a secure financial future.
                    </p>
                </div>
            </div>
        </div>
        </div>

        {/* Footer */}
        <CustomFooter />
    </div>
    );
}
