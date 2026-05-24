/** Properties of A take precedence over the element's default props. */
export type Merge<A, B> = A & Omit<B, keyof A>;
