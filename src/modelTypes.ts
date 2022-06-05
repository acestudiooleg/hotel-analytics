export type Expense = {
  ID: string;
  type: string;
  amount: number;
  comment?: string;
  hotelId: string;
};

export type ExpenseType = {
  ID: string;
  name: string;
  details?: string;
  isRecurrent?: boolean;
  userId: string;
};

export type Provider = {
  ID: string;
  name: string;
  fee: number;
  comment?: string;
  userId: string;
};

export type Settings = {
  ID: string;
  userId: string;
  lang: string;
  defaultCurrency: string;
};

export type Room = {
  ID: string;
  name: string;
  details?: string;
  hotelId: string;
};

export type Order = {
  ID: string;
  providerId: string;
  orderNumber: string;
  nationality?: string;
  firstName: string;
  lastName: string;
  peopleQty: number;
  nightsQty: number;
  hotelId: string;
};

export type OtherOrder = {
  ID: string;
  orderId: string;
  typeId: string;
  price: number;
  expense: number;
  details?: string;
};

export type OtherOrderType = {
  ID: string;
  name: string;
};

export type ExcursionOrder = {
  ID: string;
  orderId: string;
  excursionId: string;
  price: number;
  expense: number;
  peopleQty: number;
  details?: string;
};

export type Excursion = {
  ID: string;
  name: string;
  price: number;
  userId: string;
};

export type OrderToRoom = {
  ID: string;
  orderId: string;
  roomId: string;
};

export type User = {
  ID: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
};

export type Hotel = {
  ID: string;
  userId: string;
  name: string;
  location?: string;
  address?: string;
};

export type Identity = {
  ID: string;
  name: string;
  value: string;
  userId: string;
};
