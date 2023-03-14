/**
 * An array of type `T` that is guaranteed (by the type system) to have at least one element.
 */
export type NonEmptyArray<T> = [T, ...T[]]
