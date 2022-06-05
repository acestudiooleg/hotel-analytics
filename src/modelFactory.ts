import LocalStorageDB from "localstoragedb";
import Model from "./Model";
import {
  Expense,
  ExpenseType,
  Excursion,
  ExcursionOrder,
  Hotel,
  Identity,
  Order,
  OrderToRoom,
  OtherOrder,
  OtherOrderType,
  Provider,
  Room,
  Settings,
  User,
} from "./modelTypes";
import * as columns from "./modelColumns";

export class ModelFactory {
  db: LocalStorageDB;
  constructor(db: LocalStorageDB) {
    this.db = db;
  }
  Expense = () => new Model<Expense>("Expense", columns["Expense"], this.db);
  ExpenseType = () =>
    new Model<ExpenseType>("ExpenseType", columns["ExpenseType"], this.db);
  Excursion = () =>
    new Model<Excursion>("Excursion", columns["Excursion"], this.db);
  ExcursionOrder = () =>
    new Model<ExcursionOrder>(
      "ExcursionOrder",
      columns["ExcursionOrder"],
      this.db
    );
  Hotel = () => new Model<Hotel>("Hotel", columns["Hotel"], this.db);
  Identity = () =>
    new Model<Identity>("Identity", columns["Identity"], this.db);
  Order = () => new Model<Order>("Order", columns["Order"], this.db);
  OrderToRoom = () =>
    new Model<OrderToRoom>("OrderToRoom", columns["OrderToRoom"], this.db);
  OtherOrder = () =>
    new Model<OtherOrder>("OtherOrder", columns["OtherOrder"], this.db);
  OtherOrderType = () =>
    new Model<OtherOrderType>(
      "OtherOrderType",
      columns["OtherOrderType"],
      this.db
    );
  Provider = () =>
    new Model<Provider>("Provider", columns["Provider"], this.db);
  Room = () => new Model<Room>("Room", columns["Room"], this.db);
  Settings = () =>
    new Model<Settings>("Settings", columns["Settings"], this.db);
  User = () => new Model<User>("User", columns["User"], this.db);
}
