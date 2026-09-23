// src/components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block border rounded-lg overflow-hidden hover:bg-stone-900 transition"
    >
      <div className="relative w-full h-64">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="mt-2 text-sky-500 font-bold">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
