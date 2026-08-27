import { useRef } from "react";

type AnyFunction = (...args: never[]) => unknown;

export function usePersistFn<T extends AnyFunction>(fn: T): T {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;
  const persisted = useRef<T | null>(null);
  if (!persisted.current) {
    persisted.current = function (this: unknown, ...args: Parameters<T>) {
      return fnRef.current.apply(this, args);
    } as T;
  }
  return persisted.current;
}
