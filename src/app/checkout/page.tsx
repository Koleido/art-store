// src/app/checkout/page.tsx
'use client'

import { useState } from 'react'

interface OrderForm {
  name: string
  email: string
  address: string
  phone: string
  bank: string
  note: string
}

export default function CheckoutPage() {
  const [form, setForm] = useState<OrderForm>({
    name: '',
    email: '',
    address: '',
    phone: '',
    bank: '',
    note: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Lỗi server')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto text-lg py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Cảm ơn bạn!</h1>
        <p>
          Đơn hàng của bạn đã được ghi nhận. Vui lòng chuyển khoản theo thông tin bên dưới, chúng
          tôi sẽ liên hệ xác nhận sau.
        </p>
        <ul className="mt-4 text-left space-y-2">
          <li>Ngân hàng OCB: 1234 5678 9012 3456</li>
          <li>Ngân hàng VCB: 0987 6543 2109 8765</li>
          <li>Ngân hàng Techcombank: 1122 3344 5566 7788</li>
        </ul>

        <img
            src="/qr/ocb.jpg"
            alt="Mã QR ngân hàng OCB"
            className="mx-auto mt-6 w-88 h-auto rounded-lg shadow border"
        />
      </div>
    )
  }

  return (
    <div className="max-w-md text-lg mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Thông tin đặt hàng</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Họ và tên</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Địa chỉ giao hàng</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Số điện thoại</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Ngân hàng bạn dùng (OCB, VCB, Techcombank,...)</label>
          <input
            name="bank"
            value={form.bank}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">Ghi chú thêm (nếu có)</label>
          <textarea
            name="note"
            rows={3}
            value={form.note}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          {status === 'loading' ? 'Đang gửi...' : 'Xác nhận đặt hàng'}
        </button>
        {status === 'error' && <p className="text-red-500">Gửi thất bại. Vui lòng thử lại.</p>}
      </form>
    </div>
  )
}
