import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { UserPlus } from "lucide-react";

const LogoPlaceholder = () => {
return (
    <div className="flex justify-center mb-4">
    <span className="font-bold bg-primary size-10 rounded-md text-white flex justify-center items-center">
        <UserPlus />
    </span>
    </div>
    );
};

const SignUpHeader = () => {
    return (
    <CardHeader className="space-y-1">
        <LogoPlaceholder />
        <CardTitle className="text-center text-2xl">Create Account</CardTitle>
        <CardDescription className="text-center text-gray-500 dark:text-gray-400">
        Enter your details to register.
        </CardDescription>
    </CardHeader>
  );
};

type SignUpFormProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
};

const SignUpForm = ({ email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }: SignUpFormProps) => {
    return (
    <>
        <div className="space-y-2 pt-3">
        <Label className="opacity-80" htmlFor="email">
            Email
        </Label>

        {/* This input updates the email state */}
        <Input
            id="email"
            placeholder="Enter your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // capture email here
            className="bg-white/10 text-black h-10 dark:text-white"/>
        </div>

        <div className="space-y-2 pt-3">
        <Label className="opacity-80" htmlFor="password">
            Password
        </Label>

        {/* This input updates the password state */}
        <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // capture password here
            className="bg-white/10 text-black h-10 dark:text-white"/>
        </div>

        <div className="space-y-2 pt-3">
        <Label className="opacity-80" htmlFor="confirmPassword">
            Confirm Password
        </Label>

    {/* This input updates the confirm password state */}
    <Input
        id="confirmPassword"
        placeholder="Confirm your password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} // <-- capture confirm password here
        className="bg-white/10 text-black h-10 dark:text-white"/>
    </div>
    </>
    );
};

const SignUpFooter = () => {
    return (
    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
    Already have an account?
    <Button variant={"link"} className="px-1">
        <a href="/login">Log in</a>
    </Button>
    </div>
    );
};

const SignUp1 = () => {
    // This is where the user’s email & password are stored in memory

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            // Register user
            const registerRes = await axios.post("http://localhost:5255/api/auth/register", { email, password }); // 172.16.4.3:5000/
            setMessage(registerRes.data.message);
            setError("");

            localStorage.setItem("email", email);
            navigate("/Login");
        } catch (err) {
            let errorMessage = "An unknown error occurred";
            if (axios.isAxiosError(err)) {
            if (err.response && err.response.data) {
                errorMessage = err.response.data as string;
            } else {
                errorMessage = err.message;
            }
            } else if (err instanceof Error) {
            errorMessage = err.message;
            }
            setError(errorMessage);
            setMessage("");
        }
    };

  return (
    <div className="flex items-center justify-center py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        <form onSubmit={handleSubmit}>
        <Card className="w-[520px] p-3 shadow-none border-none">
            <SignUpHeader />
            <CardContent className="space-y-4 mt-4">
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}/>
            {message && <p className="text-green-600 mt-2">{message}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-6">
            {/* Clicking this button triggers handleSubmit */}
            <Button className="w-full text-white h-10" type="submit">
              Sign up
            </Button>
            <SignUpFooter />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SignUp1;
