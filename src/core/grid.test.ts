import { describe, expect, it } from "vitest";
import { gridClassNames } from "./grid";

describe("gridClassNames", () => {
  it("子要素の数から列数を決める", () => {
    expect(gridClassNames(1).container).toBe("m2012-grid-solo");
    expect(gridClassNames(2).container).toBe("m2012-grid-a");
    expect(gridClassNames(3).container).toBe("m2012-grid-b");
    expect(gridClassNames(5).container).toBe("m2012-grid-d");
    expect(gridClassNames(3).blocks).toEqual(["m2012-block-a", "m2012-block-b", "m2012-block-c"]);
  });

  it("6 個以上は 2 列（ui-grid-duo）で折り返す", () => {
    const { container, blocks } = gridClassNames(6);
    expect(container).toBe("m2012-grid-a m2012-grid-duo");
    expect(blocks).toEqual([
      "m2012-block-a",
      "m2012-block-b",
      "m2012-block-a",
      "m2012-block-b",
      "m2012-block-a",
      "m2012-block-b",
    ]);
  });

  it("列数を指定すると、その列数で折り返す", () => {
    const { container, blocks } = gridClassNames(4, 3);
    expect(container).toBe("m2012-grid-b");
    expect(blocks).toEqual(["m2012-block-a", "m2012-block-b", "m2012-block-c", "m2012-block-a"]);
  });
});
