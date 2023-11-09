export type Tail<T extends any[]> = ((...args: T) => any) extends (_: any, ...tail: infer R) => any
  ? R
  : never;
​
export type HasTail<T extends any[]> = T extends [] | [any] ? false : true;
​
export type Curry<P extends any[], R> = <T extends [P[0]]>(
  ...args: T
) => false extends HasTail<P> ? R : Curry<Tail<P>, R>;
​
export function curry<P extends any[], R>(func: (...args: P) => R): Curry<P, R> {
  return function curried(this: any, ...args: any) {
    if (args.length >= func.length) return func.apply(this, args);
​
    return function (this: any, ...args2: any) {
      return curried.apply(this, args.concat(args2) as any);
    };
  } as any;
}