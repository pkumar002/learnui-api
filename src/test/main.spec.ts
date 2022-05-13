//https://stackoverflow.com/questions/32751695/how-to-run-jest-tests-sequentially

describe("sequentially run tests", () => {
  it("run first", () => {
    const x = 90;
    expect(x).toBe(90);
  });
});
