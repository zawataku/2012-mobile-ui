import { describe, expect, it } from "vitest";
import { buttonClassNames } from "./button";

describe("buttonClassNames", () => {
  it("既定値（corners / shadow / iconshadow は true）", () => {
    expect(buttonClassNames()).toEqual({
      root: "m2012-btn m2012-surface-btn m2012-clickable m2012-shadow m2012-btn-corner-all",
      inner: "m2012-btn-inner m2012-btn-corner-all",
      text: "m2012-btn-text",
      icon: null,
    });
  });

  it("アイコンと位置", () => {
    const classNames = buttonClassNames({ icon: "home", iconpos: "top" });
    expect(classNames.root).toContain("m2012-btn-icon-top");
    expect(classNames.icon).toBe("m2012-icon m2012-icon-home m2012-icon-shadow");
  });

  it("無効状態ではホバー・押下の class を付けない", () => {
    const { root } = buttonClassNames({ disabled: true });
    expect(root).toContain("m2012-disabled");
    expect(root).not.toContain("m2012-clickable");
  });
});
