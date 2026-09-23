// src/app/products/[id]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import AddToCartButton from '@/components/AddToCartButton'

interface Params {
  params: { id: string }
}

export default function ProductDetailPage({ params }: Params) {
  const product = products.find(p => p.id === params.id)
  if (!product) notFound()

  return (
    <div className="max-w-full mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Ảnh và mô tả */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <div className="mt-4 max-w-prose">
            <h2 className="text-2xl font-semibold mb-2">Mô tả sản phẩm</h2>
            <p className="break-words whitespace-normal">
              {product.description}
            </p>
          </div>
        </div>

        {/* Thông tin & nút thêm vào giỏ */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-sky-500 font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
