"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { login, logout as apiLogout, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      const me = await refresh();
      if (!me) {
        setError("Unable to verify account. Please try again.");
        return;
      }
      if (me.role === "worker") {
        apiLogout();
        setError("This portal is for employers only. Go to app.trabz.ph to access worker features.");
        return;
      }
      let redirect = searchParams.get("redirect") || "/dashboard";
      // Prevent open redirect — only allow relative paths that don't start with "//"
      if (!redirect.startsWith("/") || redirect.startsWith("//")) {
        redirect = "/dashboard";
      }
      router.push(redirect);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <Image src="/logo.svg" alt="Trabz" width={150} height={40} className="h-10 w-auto" priority />
          </div>
          <CardTitle className="text-2xl">Welcome to Trabz Portal</CardTitle>
          <CardDescription>Sign in to manage your job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="you@company.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register as employer
            </Link>
          </p>
          <p className="mt-3 text-center text-sm text-gray-400">
            Looking for work?{" "}
            <a href="https://app.trabz.ph" className="font-medium text-blue-600 hover:text-blue-500">
              Go to Worker App
            </a>
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 rounded-lg border border-dashed border-amber-300 bg-amber-50 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Test Accounts
              </p>
              <div className="space-y-2">
                {[
                  { label: "Admin — Lino Navarra", email: "admin@trabz.ph" },
                  { label: "Employer — Maria Santos", email: "maria@jollibuild.ph" },
                  { label: "Employer — Jose Reyes", email: "jose@metrofresh.ph" },
                  { label: "Employer — Anna Cruz", email: "anna@luzonlogistics.ph" },
                  { label: "Worker — Juan Dela Cruz", email: "juan.delacruz@gmail.com" },
                  { label: "Worker — Pedro Bautista", email: "pedro.bautista@gmail.com" },
                ].map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    className="flex w-full items-center justify-between rounded-md bg-white px-3 py-2 text-left text-xs shadow-sm ring-1 ring-gray-200 transition hover:ring-blue-400"
                    onClick={() => {
                      setEmail(account.email);
                      setPassword("password123");
                    }}
                  >
                    <span className="font-medium text-gray-700">{account.label}</span>
                    <span className="text-gray-400">{account.email}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-center text-[10px] text-amber-600">
                Password for all: <code className="font-semibold">password123</code>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
