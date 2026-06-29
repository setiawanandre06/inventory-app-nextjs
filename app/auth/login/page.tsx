"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // prevent the default form submission behavior
        // specifically, we want to prevent the page from reloading when the form is submitted
        try{
            event.preventDefault();

            setLoading(true);
            setError("");

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                return;
            } else {
                router.push("/");
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    // draw the login form with email and password fields, and a submit button
    return (
        // TODO : Implement login form with email and password fields, and a submit button
        <h1 className="text-3xl font-bold underline">
            Login
        </h1>
    );
}