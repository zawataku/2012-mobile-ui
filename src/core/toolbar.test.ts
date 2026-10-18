import { describe, expect, it } from "vitest";
import { nextToolbarPhase, settleToolbarPhase, toolbarClassName } from "./toolbar";

describe("toolbarClassName", () => {
  it("固定しないツールバー", () => {
    expect(toolbarClassName({ type: "header" })).toBe("m2012-header m2012-surface-bar");
  });

  it("固定ツールバーは種類に応じたスライドの class を持つ", () => {
    expect(toolbarClassName({ type: "header", fixed: true })).toBe(
      "m2012-header m2012-surface-bar m2012-header-fixed m2012-slidedown",
    );
    expect(toolbarClassName({ type: "footer", fixed: true, transition: "fade" })).toBe(
      "m2012-footer m2012-surface-bar m2012-footer-fixed m2012-fade",
    );
  });

  it("状態に応じた class", () => {
    const base = { type: "footer", fixed: true, fullscreen: true } as const;
    expect(toolbarClassName({ ...base, phase: "hiding" })).toContain("m2012-out m2012-reverse");
    expect(toolbarClassName({ ...base, phase: "showing" })).toContain("m2012-in");
    expect(toolbarClassName({ ...base, phase: "hidden" })).toBe(
      "m2012-footer m2012-surface-bar m2012-footer-fixed m2012-footer-fullscreen m2012-slideup m2012-fixed-hidden",
    );
  });
});

describe("nextToolbarPhase", () => {
  it("アニメーションするときは途中の状態を経由する", () => {
    expect(nextToolbarPhase("visible", false, true)).toBe("hiding");
    expect(settleToolbarPhase("hiding")).toBe("hidden");
    expect(nextToolbarPhase("hidden", true, true)).toBe("showing");
    expect(settleToolbarPhase("showing")).toBe("visible");
  });

  it("アニメーションしないときはすぐに切り替わる", () => {
    expect(nextToolbarPhase("visible", false, false)).toBe("hidden");
    expect(nextToolbarPhase("hidden", true, false)).toBe("visible");
  });

  it("すでに目的の状態なら変えない", () => {
    expect(nextToolbarPhase("visible", true, true)).toBe("visible");
    expect(nextToolbarPhase("hiding", false, true)).toBe("hiding");
  });
});
