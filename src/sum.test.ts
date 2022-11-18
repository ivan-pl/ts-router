import sum from "./sum";

describe("sum", () => {
  it("returns 5", () => {
    expect(sum(3, 2)).toBe(5);
  });
});
