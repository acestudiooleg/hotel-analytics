/* eslint-disable import/namespace */
import eq from "lodash/eq";
import * as selectors from "./selectors";

const getTimeDiffColor = (timeDiff: number) =>
  /* eslint-disable */
  timeDiff > 500
    ? "#ee0000"
    : timeDiff > 200
    ? "#cc5500"
    : timeDiff > 100
    ? "#997700"
    : timeDiff > 60
    ? "#889900"
    : timeDiff > 30
    ? "#669900"
    : timeDiff > 20
    ? "#00aa00"
    : timeDiff > 10
    ? "#00bb22"
    : "#00aa77";
/* eslint-enable */
export const selectorsLogger = () => {
  const cache: Record<string, any> = {};
  return (store: any) => (next: any) => (action: any) => {
    // eslint-disable-next-line callback-return
    const result = next(action);
    Object.keys(selectors).forEach((selectorName: any) => {
      // eslint-disable-next-line import/namespace
      const selector = (selectors as any)[selectorName];
      try {
        const startTime = Date.now();
        const oldState = cache[selectorName];
        cache[selectorName] = selector(store.getState());

        if (!eq(oldState, cache[selectorName])) {
          const timeDiff = Date.now() - startTime;
          // eslint-disable-next-line no-console
          console.groupCollapsed(
            ` Selector %c"${selectorName}"%c  -  %c${timeDiff} ms`,
            "color: blue",
            "color: black",
            `color: ${getTimeDiffColor(timeDiff)}`
          );
          // eslint-disable-next-line no-console
          console.log(cache[selectorName]);
          // eslint-disable-next-line no-console
          console.groupEnd();
        }
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
    });
    return result;
  };
};
