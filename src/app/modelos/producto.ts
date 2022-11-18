export interface Producto {
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string
}

export interface ProductoConID extends Producto {
  id: number
}

export interface RespuestaProductos {
  products: ProductoConID[],
  total: number,
  skip: number,
  limit: number
}
