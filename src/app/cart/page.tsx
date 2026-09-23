'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link href="/products" className="text-red-400 text-xl hover:underline font-bold mt-4 block">
          ← Quay lại trang Sản phẩm
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>

      {items.map(item => (
        <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
          {/* Ảnh sản phẩm */}
          <div className="relative w-32 h-26">
            <Image
              src={item.product.image}
              alt={item.product.title}
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Thông tin sản phẩm & số lượng */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{item.product.title}</h2>
            <p className="text-sky-500 font-bold">${item.product.price.toFixed(2)}</p>
            <div className="mt-2">
              Số lượng:{' '}
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e => updateQuantity(item.product.id, Number(e.target.value))}
                className="w-16 border rounded px-2 py-2"
              />
            </div>
          </div>

          {/* Nút xóa */}
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="text-red-500 hover:underline cursor-pointer"
          >
            Xóa khỏi Giỏ hàng
          </button>
        </div>
    ))}

        <Link href="/products" className="text-red-400 text-xl hover:underline font-bold mt-4 block">
          ← Quay lại trang Sản phẩm
        </Link>

      {/* Tổng tiền & thanh toán */}
      <div className="mt-6 text-right">
        <span className="text-xl font-semibold">Tổng: ${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mt-4 text-right">
        <Link href="/checkout">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition cursor-pointer">
            Tiến hành thanh toán
          </button>
        </Link>
      </div>
    </div>
  )
}
