import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally joins classNames together.
 *
 * @param {...ClassValue} inputs - Class names or conditional expressions.
 * @returns {string} - The combined class names.
 *
 * @example
 * cn("foo", true && "bar", "baz"); // => "foo bar baz"
 * cn({ foo: true, bar: false, baz: isTrue() }); // => "foo baz"
 * cn(["foo", 0, false, "bar"]); // => "foo bar"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
