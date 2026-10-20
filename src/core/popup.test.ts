import { describe, expect, it } from "vitest";
import { DEFAULT_POPUP_TOLERANCE, popupPlacement, popupTolerance } from "./popup";

describe("popupTolerance", () => {
  it("既定は上下 30px・左右 15px", () => {
    expect(popupTolerance()).toEqual({ top: 30, right: 15, bottom: 30, left: 15 });
  });

  it("1 つ・2 つ・4 つの指定を展開する", () => {
    expect(popupTolerance(10)).toEqual({ top: 10, right: 10, bottom: 10, left: 10 });
    expect(popupTolerance([20, 5])).toEqual({ top: 20, right: 5, bottom: 20, left: 5 });
    expect(popupTolerance([1, 2, 3, 4])).toEqual({ top: 1, right: 2, bottom: 3, left: 4 });
  });
});

describe("popupPlacement", () => {
  const viewport = { width: 400, height: 600 };

  it("指定した点を中心に置く", () => {
    expect(popupPlacement({ x: 200, y: 300 }, { width: 100, height: 50 }, viewport)).toEqual({
      left: 150,
      top: 275,
      maxWidth: 370,
    });
  });

  it("はみ出す場合は画面の余白の内側に寄せる", () => {
    const placement = popupPlacement({ x: 10, y: 590 }, { width: 100, height: 50 }, viewport);
    expect(placement.left).toBe(DEFAULT_POPUP_TOLERANCE.left);
    expect(placement.top).toBe(600 - 30 - 50);
  });

  it("画面より大きい場合は中央に置く（上端は 0 より上にしない）", () => {
    const placement = popupPlacement({ x: 0, y: 0 }, { width: 500, height: 700 }, viewport);
    expect(placement.left).toBe(15 + (370 - 500) / 2);
    expect(placement.top).toBe(0);
  });
});
