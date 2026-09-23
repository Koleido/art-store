// src/components/AddToCartButton.tsx
"use client"

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/data/products'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  return (
    <button
      onClick={() => {
        addToCart(product)
        setAdded(true)
      }}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition w-max mb-6 cursor-pointer"
    >
      {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
    </button>
  )
}
