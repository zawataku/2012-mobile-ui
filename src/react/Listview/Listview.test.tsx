import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Listview, ListviewDivider, ListviewItem } from ".";

const renderItem = (ui: ReactElement) => {
  render(<Listview>{ui}</Listview>);
  return screen.getByRole("listitem");
};

describe("Listview", () => {
  it("inset で角丸と影の class を付ける", () => {
    render(<Listview inset />);
    expect(screen.getByRole("list")).toHaveClass(
      "m2012-listview",
      "m2012-listview-inset",
      "m2012-corner-all",
      "m2012-shadow",
    );
  });

  it("theme を指定したときだけ data-m2012-theme を付ける", () => {
    const { rerender } = render(<Listview />);
    expect(screen.getByRole("list")).not.toHaveAttribute("data-m2012-theme");
    rerender(<Listview theme="a" />);
    expect(screen.getByRole("list")).toHaveAttribute("data-m2012-theme", "a");
  });
});

describe("ListviewItem", () => {
  it("href があるとリンク項目になり、右矢印が付く", () => {
    const li = renderItem(<ListviewItem href="/next">Next</ListviewItem>);
    expect(li).toHaveClass("m2012-li-link", "m2012-clickable", "m2012-li-has-arrow");
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute("href", "/next");
    expect(li.querySelector(".m2012-icon-arrow-r")).toBeInTheDocument();
  });

  it("onClick だけの場合はボタンとして扱う", () => {
    const onClick = vi.fn();
    renderItem(<ListviewItem onClick={onClick}>Action</ListviewItem>);
    const button = screen.getByRole("button", { name: "Action" });
    button.click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("href も onClick もなければ読み取り専用項目になり、矢印は付かない", () => {
    const li = renderItem(<ListviewItem>Static</ListviewItem>);
    expect(li).toHaveClass("m2012-li-static");
    expect(li).not.toHaveClass("m2012-clickable", "m2012-li-has-arrow");
    expect(li.querySelector(".m2012-icon")).not.toBeInTheDocument();
  });

  it("arrow={false} で矢印を消せる", () => {
    const li = renderItem(
      <ListviewItem href="#" arrow={false}>
        No arrow
      </ListviewItem>,
    );
    expect(li).not.toHaveClass("m2012-li-has-arrow");
    expect(li.querySelector(".m2012-icon")).not.toBeInTheDocument();
  });

  it("count は swatch c のバブルとして表示する", () => {
    const li = renderItem(
      <ListviewItem href="#" count={12}>
        Inbox
      </ListviewItem>,
    );
    expect(li).toHaveClass("m2012-li-has-count");
    const count = screen.getByText("12");
    expect(count).toHaveClass("m2012-li-count", "m2012-surface-btn");
    expect(count).toHaveAttribute("data-m2012-theme", "c");
  });

  it("見出し・説明・aside・サムネイルを表示する", () => {
    const li = renderItem(
      <ListviewItem href="#" heading="Title" desc="Description" aside="6:24 PM" thumb="a.png" />,
    );
    expect(li).toHaveClass("m2012-li-multiline", "m2012-li-has-thumb");
    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass("m2012-li-heading");
    expect(screen.getByText("Description")).toHaveClass("m2012-li-desc");
    expect(screen.getByText("6:24 PM")).toHaveClass("m2012-li-aside");
    expect(li.querySelector("img.m2012-li-thumb")).toHaveAttribute("src", "a.png");
  });

  it("項目ごとの theme を指定できる", () => {
    const li = renderItem(<ListviewItem theme="e">Item</ListviewItem>);
    expect(li).toHaveAttribute("data-m2012-theme", "e");
  });
});

describe("ListviewDivider", () => {
  it("既定で swatch b の bar になる", () => {
    const li = renderItem(<ListviewDivider>A</ListviewDivider>);
    expect(li).toHaveClass("m2012-li-divider", "m2012-surface-bar");
    expect(li).toHaveAttribute("data-m2012-theme", "b");
  });

  it("theme と count を指定できる", () => {
    const li = renderItem(
      <ListviewDivider theme="d" count={2}>
        B
      </ListviewDivider>,
    );
    expect(li).toHaveAttribute("data-m2012-theme", "d");
    expect(li).toHaveClass("m2012-li-has-count");
    expect(screen.getByText("2")).toHaveClass("m2012-li-count");
  });
});
