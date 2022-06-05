import LocalStorageDB from "localstoragedb";
import Model from "./Model";
import { ModelFactory } from "./modelFactory";
import {
  ExpenseType,
  Expense,
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

class DB {
  name: string;
  db: LocalStorageDB;
  expenseType: Model<ExpenseType>;
  expense: Model<Expense>;
  excursion: Model<Excursion>;
  excursionOrder: Model<ExcursionOrder>;
  hotel: Model<Hotel>;
  identity: Model<Identity>;
  order: Model<Order>;
  orderToRoom: Model<OrderToRoom>;
  otherOrder: Model<OtherOrder>;
  otherOrderType: Model<OtherOrderType>;
  provider: Model<Provider>;
  room: Model<Room>;
  settings: Model<Settings>;
  user: Model<User>;
  constructor() {
    this.name = "hotelAnalytics";
    this.db = new LocalStorageDB(this.name, localStorage);
    const factory = new ModelFactory(this.db);
    this.expenseType = factory.ExpenseType();
    this.expense = factory.Expense();
    this.excursion = factory.Excursion();
    this.excursionOrder = factory.ExcursionOrder();
    this.hotel = factory.Hotel();
    this.identity = factory.Identity();
    this.order = factory.Order();
    this.orderToRoom = factory.OrderToRoom();
    this.otherOrder = factory.OtherOrder();
    this.otherOrderType = factory.OtherOrderType();
    this.provider = factory.Provider();
    this.room = factory.Room();
    this.settings = factory.Settings();
    this.user = factory.User();

    if (this.db.isNew()) {
      this.db.commit();
    }
  }

  init() {
    this.db = new LocalStorageDB(this.name, localStorage);
    const factory = new ModelFactory(this.db);
    this.expenseType = factory.ExpenseType();
    this.expense = factory.Expense();
    this.excursion = factory.Excursion();
    this.excursionOrder = factory.ExcursionOrder();
    this.hotel = factory.Hotel();
    this.identity = factory.Identity();
    this.order = factory.Order();
    this.orderToRoom = factory.OrderToRoom();
    this.otherOrder = factory.OtherOrder();
    this.otherOrderType = factory.OtherOrderType();
    this.provider = factory.Provider();
    this.room = factory.Room();
    this.settings = factory.Settings();
    this.user = factory.User();

    if (this.db.isNew()) {
      this.db.commit();
    }
  }

  restore(jsonFile: string) {
    this.db.drop();

    window.localStorage.setItem(`db_${this.name}`, jsonFile);
    return new Promise((s) => {
      this.init();
      setTimeout(s, 0);
    });
  }

  removeAll() {
    return new Promise((s) => {
      this.db.drop();
      setTimeout(s, 0);
    });
  }
}

export default new DB();
