"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulation de connexion - dans un cas réel, vous feriez une requête API
    if (formData.emailOrUsername.toLowerCase().includes("admin")) {
      router.push("/admin/dashboard")
    } else {
      router.push("/employee/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-medium text-gray-700">Please sign-in to your account and start the adventure</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emailOrUsername" className="text-gray-700">
              Email or Username
            </Label>
            <Input
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              className="h-12 border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Link href="/auth/forgot-password" className="text-sm text-gray-500 hover:text-primary">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="h-12 border-gray-300 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
              className="h-5 w-5 border-gray-300 text-primary"
            />
            <Label htmlFor="rememberMe" className="text-sm font-normal text-gray-600">
              Remember Me
            </Label>
          </div>

          <Button type="submit" className="h-12 w-full bg-indigo-500 text-white hover:bg-indigo-600">
            Sign in
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          New on our platform?{" "}
          <Link href="/auth/sign-up" className="font-medium text-indigo-500 hover:text-indigo-600">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

