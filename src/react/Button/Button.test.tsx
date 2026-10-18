import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from ".";

describe("Button", () => {
  it("href がなければ type=button の <button> になる", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass(
      "m2012-btn",
      "m2012-surface-btn",
      "m2012-clickable",
      "m2012-shadow",
      "m2012-btn-corner-all",
    );
  });

  it("type を指定できる", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute("type", "submit");
  });

  it("href があれば <a> になる", () => {
    render(<Button href="/next">Next</Button>);
    expect(screen.getByRole("link", { name: "Next" })).toHaveAttribute("href", "/next");
  });

  it("icon を指定すると既定で左にアイコンが付く", () => {
    render(<Button icon="gear">Settings</Button>);
    const button = screen.getByRole("button", { name: "Settings" });
    expect(button).toHaveClass("m2012-btn-icon-left");
    expect(button.querySelector(".m2012-icon")).toHaveClass(
      "m2012-icon-gear",
      "m2012-icon-shadow",
    );
  });

  it("icon がなければ iconpos は無視する", () => {
    render(<Button iconpos="right">Plain</Button>);
    const button = screen.getByRole("button", { name: "Plain" });
    expect(button.className).not.toMatch(/m2012-btn-icon-/);
    expect(button.querySelector(".m2012-icon")).not.toBeInTheDocument();
  });

  it("notext ではテキストを title にも入れる", () => {
    render(
      <Button icon="delete" iconpos="notext">
        Delete
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("m2012-btn-icon-notext");
    expect(button).toHaveAttribute("title", "Delete");
  });

  it("title を明示したらそちらを優先する", () => {
    render(
      <Button icon="delete" iconpos="notext" title="削除">
        Delete
      </Button>,
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute("title", "削除");
  });

  it("inline / mini は true と false で別の class を付ける", () => {
    const { rerender } = render(<Button>Size</Button>);
    const button = screen.getByRole("button", { name: "Size" });
    expect(button.className).not.toMatch(/m2012-(mini|fullsize|btn-inline|btn-block)/);

    rerender(
      <Button inline mini>
        Size
      </Button>,
    );
    expect(button).toHaveClass("m2012-btn-inline", "m2012-mini");

    rerender(
      <Button inline={false} mini={false}>
        Size
      </Button>,
    );
    expect(button).toHaveClass("m2012-btn-block", "m2012-fullsize");
  });

  it("corners / shadow / iconshadow を外せる", () => {
    render(
      <Button icon="star" corners={false} shadow={false} iconshadow={false}>
        Flat
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Flat" });
    expect(button).not.toHaveClass("m2012-btn-corner-all", "m2012-shadow");
    expect(button.querySelector(".m2012-btn-inner")).not.toHaveClass("m2012-btn-corner-all");
    expect(button.querySelector(".m2012-icon")).not.toHaveClass("m2012-icon-shadow");
  });

  it("theme と active を反映する", () => {
    render(
      <Button theme="b" active>
        On
      </Button>,
    );
    const button = screen.getByRole("button", { name: "On" });
    expect(button).toHaveAttribute("data-m2012-theme", "b");
    expect(button).toHaveClass("m2012-btn-active");
  });

  it("無効な <button> はクリックできない", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Off
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Off" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("m2012-disabled");
    expect(button).not.toHaveClass("m2012-clickable");
    button.click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("無効なリンクは href を外し aria-disabled を付ける", () => {
    const { container } = render(
      <Button href="/next" disabled>
        Next
      </Button>,
    );
    const anchor = container.querySelector("a");
    expect(anchor).not.toHaveAttribute("href");
    expect(anchor).toHaveAttribute("aria-disabled", "true");
    expect(anchor).toHaveClass("m2012-disabled");
  });

  it("ref を受け取れる", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBe(screen.getByRole("button", { name: "Ref" }));
  });
});
