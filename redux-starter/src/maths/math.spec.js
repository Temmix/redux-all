import { isEven } from "./math";

describe("isEven", () => {
  it("should return true if given even number", () => {
    // Function under test SUT
    const result = isEven(6);
    expect(result).toEqual(true);
  });

  it("should return false if given even number", () => {
    // Function under test SUT
    const result = isEven(7);
    expect(result).toEqual(false);
  });

  it("should return false if given undefined", () => {
    // Function under test SUT
    const result = isEven(undefined);
    expect(result).toEqual(false);
  });

  it("should return false if given null", () => {
    // Function under test SUT
    const result = isEven(null);
    expect(result).toEqual(false);
  });
});
