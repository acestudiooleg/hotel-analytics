import { StrictEffect } from "redux-saga/effects";

export type TSaga<Next = any, Return = void> = Generator<
  StrictEffect,
  Return,
  Next
>;