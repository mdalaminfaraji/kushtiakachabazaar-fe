export interface OrderItem {
  id: number;
  name: string;
  englishName: string;
  perKgPrice?: number;
  pricePerPiece?: number;
  quantity: number;
  total: number;
}

export interface OrderInput {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  location: any;
  totalAmount: number;
  products: string[]; // documentIds for relations
}

export interface CreateOrderResponse {
  createOrder: {
    documentId: string;
    customerName: string;
    totalAmount: number;
    orderStatus: string;
  }
}

export interface Product {
  documentId: string;
  name: string;
  name_bn: string;
  price: number;
  unit: string;
  inStock: boolean;
}

export interface ProductsResponse {
  products: Product[];
}

export interface NecessaryProduct {
  documentId: string;
  name: string;
  englishName: string;
  isPricePerPiece: boolean;
  pieceOptions: number[];
  unit: string;
  isAvailable: boolean;
  pricePerKg: number;
  pricePerPiece: number;
  quantityOptions: number[];
}

export interface NecessaryProductsResponse {
  necessaryProductsLists: NecessaryProduct[];
}
