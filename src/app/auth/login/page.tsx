"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import AltLoginCard from "@/components/auth/AltLoginCard";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // prevent the default form submission behavior
        // specifically, we want to prevent the page from reloading when the form is submitted
        try {
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
                console.log("Login success");
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AltLoginCard
            email={email}
            password={password}
            error={error}
            loading={loading}
            onSubmit={handleSubmit}
            onEmailChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            onPasswordChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
        />
    );
}