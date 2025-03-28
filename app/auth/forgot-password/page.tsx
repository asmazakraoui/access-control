"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <Link href="/auth/sign-in" className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        <div className="mb-6">
          <h1 className="text-xl font-medium text-gray-700">Forgot Password</h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>

        {submitted ? (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div>
                <p className="text-sm font-medium text-green-800">Password reset email sent</p>
                <p className="mt-1 text-sm text-green-700">
                  Check your email for a link to reset your password. If it doesn't appear within a few minutes, check
                  your spam folder.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-300"
                required
              />
            </div>

            <Button type="submit" className="h-12 w-full bg-indigo-500 text-white hover:bg-indigo-600">
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/auth/sign-in" className="font-medium text-indigo-500 hover:text-indigo-600">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

