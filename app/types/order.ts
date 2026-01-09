export interface OrderItemDTO {
  id: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  productId: string;
  orderId: string;
}

export interface OrderDTO {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  items: OrderItemDTO[];
  user?: {
    name?: string | null;
    email?: string | null;
  };
}