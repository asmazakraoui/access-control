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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
    role: "employee", // Par défaut, l'inscription crée un compte employé
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

    // Simulation d'inscription - dans un cas réel, vous feriez une requête API
    if (formData.role === "admin") {
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
            <Label htmlFor="username" className="text-gray-700">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="h-12 border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
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

          <div className="space-y-4">
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="adminRole"
                checked={formData.role === "admin"}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData((prev) => ({ ...prev, role: "admin" }))
                  } else {
                    setFormData((prev) => ({ ...prev, role: "employee" }))
                  }
                }}
                className="h-5 w-5 border-gray-300 text-primary"
              />
              <Label htmlFor="adminRole" className="text-sm font-normal text-gray-600">
                S'inscrire en tant qu'administrateur
              </Label>
            </div>
          </div>

          <Button type="submit" className="h-12 w-full bg-indigo-500 text-white hover:bg-indigo-600">
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-medium text-indigo-500 hover:text-indigo-600">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

