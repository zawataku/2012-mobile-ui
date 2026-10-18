import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Collapsible, CollapsibleSet } from ".";

const toggle = (name: string) => screen.getByRole("button", { name });

describe("Collapsible", () => {
  it("既定で閉じていて、見出しのタップで開閉する", () => {
    render(<Collapsible heading="Header">中身</Collapsible>);
    const button = toggle("Header");
    const content = screen.getByText("中身");

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", content.id);
    expect(content).toHaveClass("m2012-collapsible-content-collapsed");
    expect(button.querySelector(".m2012-icon")).toHaveClass("m2012-icon-plus");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(content).not.toHaveClass("m2012-collapsible-content-collapsed");
    expect(button.querySelector(".m2012-icon")).toHaveClass("m2012-icon-minus");
  });

  it("見出しは h3、ボタンは角丸・影なしの通常サイズ", () => {
    render(<Collapsible heading="Header">中身</Collapsible>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveClass("m2012-collapsible-heading", "m2012-collapsible-heading-collapsed");
    const button = toggle("Header");
    expect(button).toHaveClass("m2012-fullsize", "m2012-btn-icon-left");
    expect(button).not.toHaveClass("m2012-btn-corner-all", "m2012-shadow");
    expect(heading.parentElement).toHaveClass("m2012-collapsible", "m2012-collapsible-inset");
  });

  it("theme / contentTheme / アイコン / 位置 / mini / inset を反映する", () => {
    render(
      <Collapsible
        heading="Header"
        theme="b"
        contentTheme="d"
        collapsedIcon="arrow-r"
        iconpos="right"
        mini
        inset={false}
        headingLevel={2}
      >
        中身
      </Collapsible>,
    );
    const button = toggle("Header");
    expect(button).toHaveAttribute("data-m2012-theme", "b");
    expect(button).toHaveClass("m2012-mini", "m2012-btn-icon-right");
    expect(button.querySelector(".m2012-icon")).toHaveClass("m2012-icon-arrow-r");
    const content = screen.getByText("中身");
    expect(content).toHaveClass("m2012-surface-body");
    expect(content).toHaveAttribute("data-m2012-theme", "d");
    expect(screen.getByRole("heading", { level: 2 }).parentElement).not.toHaveClass(
      "m2012-collapsible-inset",
    );
  });

  it("collapsed を指定すると制御され、onCollapsedChange で知らせる", () => {
    const onCollapsedChange = vi.fn();
    render(
      <Collapsible heading="Header" collapsed onCollapsedChange={onCollapsedChange}>
        中身
      </Collapsible>,
    );
    fireEvent.click(toggle("Header"));
    expect(onCollapsedChange).toHaveBeenCalledWith(false);
    expect(toggle("Header")).toHaveAttribute("aria-expanded", "false");
  });
});

describe("CollapsibleSet", () => {
  const renderSet = (props: React.ComponentProps<typeof CollapsibleSet> = {}) =>
    render(
      <CollapsibleSet {...props}>
        <Collapsible heading="One">1</Collapsible>
        <Collapsible heading="Two" defaultCollapsed={false}>
          2
        </Collapsible>
        <Collapsible heading="Three">3</Collapsible>
      </CollapsibleSet>,
    );

  it("defaultCollapsed={false} の項目を最初に開き、1 つ開くとほかは閉じる", () => {
    renderSet();
    expect(toggle("Two")).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(toggle("One"));
    expect(toggle("One")).toHaveAttribute("aria-expanded", "true");
    expect(toggle("Two")).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle("One"));
    expect(toggle("One")).toHaveAttribute("aria-expanded", "false");
  });

  it("セットの設定を項目が受け継ぐ", () => {
    renderSet({ theme: "a", contentTheme: "e", iconpos: "right", inset: false });
    expect(toggle("One")).toHaveAttribute("data-m2012-theme", "a");
    expect(toggle("One")).toHaveClass("m2012-btn-icon-right");
    expect(screen.getByText("1")).toHaveAttribute("data-m2012-theme", "e");
    expect(screen.getByText("1").parentElement).not.toHaveClass("m2012-collapsible-inset");
  });

  it("expanded を指定すると制御され、onExpandedChange で知らせる", () => {
    const onExpandedChange = vi.fn();
    renderSet({ expanded: 0, onExpandedChange });
    expect(toggle("One")).toHaveAttribute("aria-expanded", "true");
    expect(toggle("Two")).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle("Three"));
    expect(onExpandedChange).toHaveBeenCalledWith(2);
    expect(toggle("One")).toHaveAttribute("aria-expanded", "true");
  });
});
