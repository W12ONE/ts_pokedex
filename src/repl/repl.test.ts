import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: " hello world ",
    expected: ["hello", "world"],
  },
  {
    input: "fuck this",
    expected: ["fuck", "this"],
  },
  {
    input: "I want to go to Korea",
    expected: ["I", "want", "to", "go", "to", "Korea"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test("Èxpected: ${expected}", () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
