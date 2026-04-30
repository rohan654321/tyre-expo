// app/admin/debug/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAdminToken, getAdminUser } from "@/lib/api/auth";

export default function DebugPage() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [validationResult, setValidationResult] = useState<any>(null);

    useEffect(() => {
        const storedToken = getAdminToken();
        const storedUser = getAdminUser();
        setToken(storedToken);
        setUser(storedUser);

        // Test the token with backend
        if (storedToken) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(res => res.json())
                .then(data => setValidationResult(data))
                .catch(err => setValidationResult({ error: err.message }));
        }
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-white">Debug Page</h1>

            <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Token Status</h2>
                <p className="text-gray-300">Token exists: {token ? "✅ Yes" : "❌ No"}</p>
                {token && (
                    <>
                        <p className="text-gray-300 mt-2">Token value: <span className="text-xs">{token.substring(0, 50)}...</span></p>
                        <p className="text-gray-300 mt-2">Token length: {token.length}</p>
                    </>
                )}
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">User Data</h2>
                <pre className="text-xs text-gray-300">{JSON.stringify(user, null, 2)}</pre>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Token Validation Result</h2>
                <pre className="text-xs text-gray-300">{JSON.stringify(validationResult, null, 2)}</pre>
            </div>
        </div>
    );
}