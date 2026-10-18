import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Navbar, NavbarItem } from ".";

describe("Navbar", () => {
  it("項目をグリッドに並べ、角丸・影なしの inline ボタンにする", () => {
    render(
      <Navbar>
        <NavbarItem href="#">One</NavbarItem>
        <NavbarItem href="#">Two</NavbarItem>
        <NavbarItem href="#">Three</NavbarItem>
      </Navbar>,
    );
    const navigation = screen.getByRole("navigation");
    expect(navigation).toHaveClass("m2012-navbar", "m2012-mini");
    expect(screen.getByRole("list")).toHaveClass("m2012-grid-b");
    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => item.className)).toEqual([
      "m2012-block-a",
      "m2012-block-b",
      "m2012-block-c",
    ]);

    const link = screen.getByRole("link", { name: "One" });
    expect(link).toHaveClass("m2012-btn-inline");
    expect(link).not.toHaveClass("m2012-btn-corner-all", "m2012-shadow");
  });

  it("どれかにアイコンがあれば、すべての項目にアイコン位置を付ける", () => {
    render(
      <Navbar>
        <NavbarItem href="#" icon="home">
          Home
        </NavbarItem>
        <NavbarItem href="#">Text</NavbarItem>
      </Navbar>,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("m2012-btn-icon-top");
    expect(screen.getByRole("link", { name: "Text" })).toHaveClass("m2012-btn-icon-top");
  });

  it("アイコンがなければアイコン位置を付けない", () => {
    render(
      <Navbar iconpos="left">
        <NavbarItem href="#">Text</NavbarItem>
      </Navbar>,
    );
    expect(screen.getByRole("link", { name: "Text" }).className).not.toMatch(/m2012-btn-icon-/);
  });

  it("active を反映する", () => {
    render(
      <Navbar>
        <NavbarItem active>On</NavbarItem>
        <NavbarItem>Off</NavbarItem>
      </Navbar>,
    );
    expect(screen.getByRole("button", { name: "On" })).toHaveClass("m2012-btn-active");
    expect(screen.getByRole("button", { name: "Off" })).not.toHaveClass("m2012-btn-active");
  });
});
