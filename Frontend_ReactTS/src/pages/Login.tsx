import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const LogoPlaceholder = () => {
    return (
    <div className="flex justify-center mb-4">
        <span className="font-bold bg-primary size-10 rounded-md text-white flex justify-center items-center">
        <Lock />
        </span>
    </div>
    );
};

const LoginHeader = () => {
  return (
    <CardHeader className="space-y-1">
        <LogoPlaceholder />
        <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
        <CardDescription className="text-center text-gray-500 dark:text-gray-400">
        Enter your email and password to continue.
        </CardDescription>
    </CardHeader>
  );
};

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
}: {
    email: string;
    setEmail: (v: string) => void;
    password: string;
    setPassword: (v: string) => void;
}) => {
    return (
    <>
        <div className="space-y-2">
        <Label className="opacity-80" htmlFor="email">
            Email
        </Label>
        <Input
            id="email"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 text-black h-10 dark:text-white"
        />
        </div>

        <div className="space-y-2">
        <Label className="opacity-80" htmlFor="password">
            Password
        </Label>
        <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 text-black h-10 dark:text-white"
        />
        </div>

        <div className="flex items-center justify-between">
        <Button variant="link" className="px-0">
            <a href="#" className="text-sm hover:underline">
            Forgot password
            </a>
        </Button>
        </div>
    </>
    );
};

const LoginFooter = () => {
    return (
    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?
        <Button variant="link" className="px-1">
        <a href="/">Register</a>
        </Button>
    </div>
  );
};

const Login = () => {
    // Future API-ready state
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    // Future API-ready handler
    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation (same style as Signup)
    if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    setLoading(true);

    try {
        // FUTURE: Replace with your Neon-powered backend call
        // const res = await fetch("/api/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ email, password }),
        // });

        // const data = await res.json();
        // if (!res.ok) throw new Error(data.message);

        console.log("Ready for Neon backend:", { email, password });

        // 🔥 FUTURE: Handle success (session, redirect, etc.)
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Login failed. Please try again.");
        }
    } finally {
        setLoading(false);
    }
    };

    return (
    <div className="flex items-center justify-center min-h-screen py-3 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <form onSubmit={handleLogin}>
        <Card className="w-[520px] p-3">
            <LoginHeader />

            <CardContent className="space-y-4 mt-4">
            <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}/>
                
            {/* Inline error popup (same style as Signup) */}
            {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4 mt-4">
            <Button className="w-full text-white h-10" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </Button>
            <LoginFooter />
            </CardFooter>
        </Card>
        </form>
    </div>
    );
};

export default Login;
