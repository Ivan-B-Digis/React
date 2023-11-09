export type Negatives = null | undefined;
​
export type Nullable<T> = T | Negatives;
​
export type ObjectType<T = any, P extends PropertyKey = PropertyKey> = Record<P, T>;
​
export type ArrayElement<A> = A extends any[] ? A[number] : A;
​
type ValueIteratee<T> = ((value: T) => unknown) | (T extends ObjectType ? keyof T : never);
​
export const uniqBy = <T extends any[]>(
  array: Nullable<T>,
  iteratee: ValueIteratee<ArrayElement<T>>,
): NonNullable<T> => {
  if (!array || !array.length) return [] as any;
​
  const uniqMap = new Map<any, ArrayElement<T>>();
​
  array.forEach((el) => {
    const compareValue = typeof iteratee === "function" ? iteratee(el) : el[iteratee as keyof T];
    if (!uniqMap.has(compareValue)) uniqMap.set(compareValue, el);
  });
​
  return [...uniqMap.values()] as NonNullable<T>;
};