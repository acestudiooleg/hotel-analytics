export type Action<P> = {
  type: string;
  payload: P;
};

export type EmptyAction = {
  type: string;
  payload?: any;
};

export function makeTypes<T extends string>(name: string, slice: Record<string, any>) {
  return Object.keys(slice).reduce(
    (acc, key) => ({ ...acc, [key]: `${name}/${key}` }),
    {}
  ) as Record<T, T>;
}
