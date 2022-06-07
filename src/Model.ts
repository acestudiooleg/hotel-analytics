import LocalStorageDB, { QueryFunc, Query } from "localstoragedb";
export type ID = {
  ID: string;
};

export type TArray<T> = T extends Array<T> ? Promise<T[]> : Promise<T>;
export type TId<T> = (Partial<T> & ID) | (Partial<T> & ID)[];

export type Q<T> = Query<T & ID> | QueryFunc<T & ID>;

export default class Model<T extends Record<string, any>> {
  name: string;
  db: LocalStorageDB;
  constructor(name: string, columns: (keyof T)[], db: LocalStorageDB) {
    this.name = name;
    this.db = db;

    if (this.db.isNew()) {
      this.db.createTable(name, columns as string[]);
    }
  }

  create<T extends Record<string, any>>(data: T | T[]): Promise<T[]> {
    if (data instanceof Array) {
      data.forEach((el) => this.db.insert(this.name, el));
      this.db.commit();
      return this.read<T>({
        query: (r) =>
          data.some((d) => Object.keys((key: keyof T) => d[key] === r[key])),
      });
    }
    this.db.insert(this.name, data);

    this.db.commit();

    return this.read<any>({
      query: data,
    });
  }

  update<T extends Record<string, any>>(data: TId<T>) {
    if (data instanceof Array) {
      data.forEach((el) => this.db.update(this.name, { ID: el.ID }, () => el));
      this.db.commit();
      return this.read<T>({
        query: (r) => data.some((d) => d.ID === r.ID),
      });
    }
    this.db.update(this.name, { ID: data.ID }, () => data);
    this.db.commit();
    return this.read({
      query: {
        ID: data.ID,
      },
    });
  }

  read<T extends Record<string, any>>(params?: Q<T>) {
    return Promise.resolve(this.db.queryAll<T>(this.name, params));
  }

  delete<T extends Record<string, any>>(data: TId<T>) {
    if (data instanceof Array) {
      data.forEach((el) => this.db.deleteRows(this.name, el));
    } else {
      this.db.deleteRows(this.name, data);
    }
    this.db.commit();
    return Promise.resolve(data);
  }
}
