/// <reference types="react-scripts" />

declare module "@clarketm/saga-monitor";
declare module "react-easy-swipe";
declare module "localstoragedb" {
  export type QueryFunc<T extends Record<string, any>> = (row: T) => boolean;
  export type Query<T extends Record<string, any>> = {
    query: Partial<T> | QueryFunc<T>;
    limit?: number;
    sort?: [keyof T, "ASC" | "DESC"][];
    distinct?: keyof T[];
  };
  export default class LocalStorageDB {
    constructor(name: string, storage: Storage);
    createTable(name: string, fields: string[]): void;
    drop(): void;
    isNew(): boolean;
    get(name: string): any;
    insert(name: string, value: any): void;
    update(name: string, value: any, fn: (el: any) => any): void;
    queryAll<T = any>(name: string, value: Query): Promise<T[]>;
    deleteRows(name: string, value: any): void;
    commit(): void;
  }
}

declare module '@mui/material/styles' {
  export const createTheme: any;
  export const ThemeProvider: any;
  export const makeStyles: any;
  export const withStyles: any;
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
declare module "@mui/styles" {
  export const createTheme: any;
  export const ThemeProvider: any;
  export const makeStyles: any;
  export const withStyles: any;
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
