export function invariant<T>(
  condition: T,
  message?: string | (() => string)
): asserts condition {
  if (condition != null) return;

  const provided = typeof message === "function" ? message() : message;
  const prefix = "Invariant failed";
  const value = provided ? `${prefix}: ${provided}` : prefix;
  throw new Error(value);
}
