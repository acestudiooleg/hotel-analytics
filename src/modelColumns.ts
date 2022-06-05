import * as t from "./modelTypes";

export const Expense: Array<keyof t.Expense> = [
  "type",
  "amount",
  "comment",
  "hotelId",
];

export const ExpenseType: Array<keyof t.ExpenseType> = [
  "name",
  "details",
  "isRecurrent",
  "userId",
];
export const Excursion: Array<keyof t.Excursion> = ["name", "price", "userId"];
export const ExcursionOrder: Array<keyof t.ExcursionOrder> = [
  "orderId",
  "excursionId",
  "price",
  "details",
  "expense",
  "peopleQty",
];
export const Hotel: Array<keyof t.Hotel> = [
  "name",
  "address",
  "location",
  "name",
  "userId",
];
export const Identity: Array<keyof t.Identity> = ["name", "userId", "value"];
export const Order: Array<keyof t.Order> = [
  "firstName",
  "hotelId",
  "lastName",
  "nationality",
  "nightsQty",
  "orderNumber",
  "peopleQty",
  "providerId",
];
export const OrderToRoom: Array<keyof t.OrderToRoom> = ["orderId", "roomId"];
export const OtherOrder: Array<keyof t.OtherOrder> = [
  "details",
  "expense",
  "orderId",
  "price",
  "typeId",
];
export const OtherOrderType: Array<keyof t.OtherOrderType> = ["name"];
export const Provider: Array<keyof t.Provider> = [
  "comment",
  "fee",
  "name",
  "userId",
];
export const Room: Array<keyof t.Room> = ["details", "hotelId", "name"];
export const Settings: Array<keyof t.Settings> = [
  "defaultCurrency",
  "lang",
  "userId",
];
export const User: Array<keyof t.User> = [
  "email",
  "firstName",
  "lastName",
  "phone",
];
