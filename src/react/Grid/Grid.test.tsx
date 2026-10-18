import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Grid } from ".";

describe("Grid", () => {
  it("子要素をブロックで包み、数から列数を決める", () => {
    const { container } = render(
      <Grid className="extra">
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </Grid>,
    );
    const grid = container.firstElementChild!;
    expect(grid).toHaveClass("m2012-grid-b", "extra");
    expect([...grid.children].map((block) => block.className)).toEqual([
      "m2012-block-a",
      "m2012-block-b",
      "m2012-block-c",
    ]);
    expect(grid.children[0]).toHaveTextContent("A");
  });

  it("columns を指定すると、その列数で折り返す", () => {
    const { container } = render(
      <Grid columns={2}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </Grid>,
    );
    const grid = container.firstElementChild!;
    expect(grid).toHaveClass("m2012-grid-a");
    expect(grid.children[2]).toHaveClass("m2012-block-a");
  });
});
