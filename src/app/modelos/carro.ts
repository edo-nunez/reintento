import {ProductoConID} from "./producto"

export interface Carro {
  carts: Array<CarritoUsuario>,
  total: number,
  skip: number,
  limit: number
}

export interface agregarProducto {
  producto: ProductoConID,
  quantity: number
}

export interface CarritoUsuario {
  id: number,
  products: agregarProducto[],
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface agregarCarro {
  userId: string,
  products: agregarProducto[]
}
