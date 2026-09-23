// src/data/products.ts
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string; // đường dẫn tới ảnh trong public/images/
  description: string;  // thêm mô tả
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Arlerchino',
    price: 29.99,
    image: '/images/Arlecchino.jpg',
    description: 'Ảnh Genshin siêu đẹp!!!',
  },
  {
    id: '2',
    title: 'Hutao',
    price: 19.99,
    image: '/images/Hutao.jpg',
    description: 'Ảnh Genshin siêu đẹp!!!',
  },
  {
    id: '3',
    title: 'Zhongli Book',
    price: 24.99,
    image: '/images/ZhongliBook.jpg',
    description: 'Ảnh Genshin siêu đẹp!!!',
  },
  // … thêm tạm vài sản phẩm nữa
  {
    id: '4',
    title: 'Charlotte',
    price: 5.99,
    image: '/images/Charlotte.jpg',
    description: 'Ảnh Genshin siêu đẹp!!!',
  },
    {
    id: '5',
    title: 'Citlali Pijama',
    price: 14.99,
    image: '/images/CitlaliPijama.jpg',
    description: 'Ảnh Genshin siêu đẹp!!!',
  },
    {
    id: '6',
    title: 'Five Archons Kimono',
    price: 64.99,
    image: '/images/FiveArchonsKimono.jpg',
    description: 'Ảnh Genshin siêu đẹp!!!',
  },
];
