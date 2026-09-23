// src/app/auth/signin/page.tsx
"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // gọi NextAuth Credentials provider
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",   // khi login thành công sẽ redirect về trang chủ
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-8 rounded-lg shadow"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Đăng nhập <i>(Staff only)</i></h1>
        {error && (
          <p className="text-xl mb-4 text-red-600">
            {error === "CredentialsSignin"
              ? "Email hoặc mật khẩu không đúng."
              : "Đã xảy ra lỗi, vui lòng thử lại."}
          </p>
        )}
        <div className="mb-4">
          <label className="text-xl block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-6">
          <label className="text-xl block mb-1">Mật khẩu</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 cursor-pointer transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
