import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Content, Page } from ".";

describe("Page", () => {
  it("既定で swatch c の body surface になる", () => {
    render(<Page data-testid="page" />);
    const page = screen.getByTestId("page");
    expect(page).toHaveClass("m2012-page", "m2012-surface-body");
    expect(page).toHaveAttribute("data-m2012-theme", "c");
  });
});

describe("Content", () => {
  it("main ランドマークになり、theme を指定したときだけ body surface を付ける", () => {
    const { rerender } = render(<Content>本文</Content>);
    const content = screen.getByRole("main");
    expect(content).toHaveClass("m2012-content");
    expect(content).not.toHaveClass("m2012-surface-body");
    expect(content).not.toHaveAttribute("data-m2012-theme");

    rerender(<Content theme="e">本文</Content>);
    expect(content).toHaveClass("m2012-surface-body");
    expect(content).toHaveAttribute("data-m2012-theme", "e");
  });
});
