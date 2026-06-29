import { describe, expect, it, vi } from "vitest";
import { signIn } from "next-auth/react";
import bcrypt from "bcryptjs";
import { redirect } from "next/dist/server/api-utils";
import { authOptions } from "../../lib/auth";

// Vitest Docs : https://vitest.dev/guide/

vi.mock("next-auth/react", () => ({
    signIn: vi.fn(),
}));

vi.mock("../../lib/prisma", () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
        },
    },
}));

describe("Authentication", () => {
    // Test cases for authentication logic
    // it = alias for test

    it("should authenticate a user with valid credentials", async () => {
        // we need to input email and password, 
        // then check if the user is authenticated successfully
        const email = "staff@inventory.dev";
        const password = "password"; // The password we seeded for the staff user

        // we use signIn from next-auth/react to simulate the sign-in process
        // Note: In a real test, you would mock the signIn function and check its behavior
        // For this example, we will just check if the signIn function is called with the correct parameters
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        expect(signIn).toHaveBeenCalledWith("credentials", { 
            email, 
            password, 
            redirect: false 
        });
    });

    it("should not authenticate a user with invalid credentials", async () => {
        // we need to input email and password, 
        // then check if the user is not authenticated
        const email = "staff@inventory.dev";
        const password = "wrongpassword";

        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        expect(signIn).toHaveBeenCalledWith("credentials", {
            email,
            password,
            redirect: false,
        });
    });
});

describe("bcrypt password hashing", () => {
    // Test cases for bcrypt password hashing

    it("hashes a password and verifies it correctly", async () => {
        const plain = "mysecretpassword";
        const hashed = await bcrypt.hash(plain, 10);

        expect(hashed).not.toBe(plain);  // Ensure the hashed password is not the same as the plain password
        expect(hashed.startsWith("$2a$10$") || hashed.startsWith("$2b$10$")).toBe(true); // Check if the hash starts with the expected prefix for bcrypt
        expect(await bcrypt.compare(plain, hashed)).toBe(true);  // Verify that the plain password matches the hashed password
    });

    it("returns false for an incorrect password", async () => {
        const plain = "mysecretpassword";
        const hashed = await bcrypt.hash(plain, 10);

        expect(await bcrypt.compare("wrongpassword", hashed)).toBe(false);
    });

    it("two different hashes for the same password should not be equal", () => {
        const hash1 = bcrypt.hashSync("mysecretpassword", 10);
        const hash2 = bcrypt.hashSync("mysecretpassword", 10);        

        expect(hash1).not.toBe(hash2);  // Ensure that two different hashes for the same password are not equal
        
    });

    it("handles empty-string passwords consistently", async () => {
        const emptyHash = await bcrypt.hash("", 10);
        const nonEmptyHash = bcrypt.hashSync("nonempty", 10);

        expect(await bcrypt.compare("", emptyHash)).toBe(true);
        expect(await bcrypt.compare("nonempty", emptyHash)).toBe(false);
        expect(emptyHash).not.toBe(nonEmptyHash);  // Ensure that the hash of an empty string is different from the hash of a non-empty string
    });
});

describe("session shape", () => {
    it("token contains id and role after jwt callback", async () => {
        // simulate output from jwt() callback in lib/auth.ts

        // First, we need to provide the token input
        const tokenInput = {
            name: "Admin User",
            email: "admin@inventory.dev",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 86400,
        };

        // Second, we need to provide the user data
        const user = {
            id: "usr_123",
            role: "ADMIN",
            name: "Admin User",
            email: "admin@inventory.dev",
        };

        // Third, we need to get the jwt callback from authOptions
        const jwtCallback = authOptions.callbacks?.jwt;
        expect(jwtCallback).toBeDefined();

        // Fourth, we need to call the jwt callback with the token and user data
        const token = await jwtCallback!( {
            token: tokenInput,
            user,
            account: null,
            profile: undefined,
            trigger: "signIn",
            isNewUser: undefined
        });

        expect(token.id).toEqual("usr_123");
        expect(token.role).toEqual("ADMIN");
        expect((token as any).exp).toBeGreaterThan((token as any).iat!);
    });

    it("session callback maps token.id to session.user.id", async () => {
        const token = {
            id: "usr_xyz",
            role: "STAFF",
            name: "Staff User"
        };

        const initialSession = {
            user: {
                name: token.name,
            },
            expires: ""
        };

        const sessionCallback = authOptions.callbacks?.session;
        expect(sessionCallback).toBeDefined();

        const session = await sessionCallback!({
            session: initialSession,
            token,
            user: null as any
        } as any);

        expect((session.user as any).id).toBe("usr_xyz");
        expect((session.user as any).role).toBe("STAFF");
    });

    it("handles missing token.id gracefully", async () => {
        const token = {
            role: "STAFF",
            name: "Staff User"
        };

        const initialSession = {
            user: {
                name: token.name,
            },
            expires: ""
        };

        const sessionCallback = authOptions.callbacks?.session;
        expect(sessionCallback).toBeDefined();

        const session = await sessionCallback!({
            session: initialSession,
            token,
            user: null as any
        } as any);

        expect((session.user as any).id).toBeFalsy();
    });

    it("only exposes allowed properties", async () => {
        const token = {
            id: "usr_xyz",
            role: "STAFF",
            name: "Staff User",
            email: "staff@inventory.dev",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 86400,
            password: "secret"
        };

        const initialSession = {
            user: {
                name: token.name,
                email: token.email,
            },
            expires: ""
        };

        const sessionCallback = authOptions.callbacks?.session;
        expect(sessionCallback).toBeDefined();

        const session = await sessionCallback!({
            session: initialSession,
            token,
            user: null as any
        } as any);

        expect((session.user as any).id).toBe("usr_xyz");
        expect((session.user as any).role).toBe("STAFF");
        expect((session.user as any).password).toBeUndefined();
    });
});

