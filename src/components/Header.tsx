"use client"

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow-md text-gray-800">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/KoleidoArtStore" className="text-2xl font-bold hover:text-red-300 transition">
          ArtStore
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/" className="font-bold hover:text-red-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" className="font-bold hover:text-red-300 transition">
              Sản phẩm
            </Link>
          </li>
          <li>
            <Link href="/cart" className="font-bold hover:text-red-300 transition">
              Giỏ hàng
            </Link>
          </li>
          {status === 'loading' ? (
            <li className="font-bold">...</li>
          ) : session ? (
            <>
              <li className="font-bold text-red-500">Hello, {session.user?.name}</li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="font-bold hover:text-red-300 cursor-pointer transition"
                >
                  Đăng xuất
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/signin" className="font-bold hover:text-red-300 transition">
                Đăng nhập
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
