import { describe, expect, it } from "vitest";
import {
  flipSwitchLabelWidths,
  sliderPercent,
  sliderValueFromKey,
  sliderValueFromPercent,
  snapSliderValue,
} from "./slider";

describe("snapSliderValue", () => {
  it("step の倍数にそろえ、範囲に収める", () => {
    expect(snapSliderValue(23, 0, 100, 5)).toBe(25);
    expect(snapSliderValue(22, 0, 100, 5)).toBe(20);
    expect(snapSliderValue(-3, 0, 100, 5)).toBe(0);
    expect(snapSliderValue(130, 0, 100, 5)).toBe(100);
  });

  it("小数の step の誤差を丸める", () => {
    expect(snapSliderValue(0.30000000000000004, 0, 1, 0.1)).toBe(0.3);
  });
});

describe("sliderPercent / sliderValueFromPercent", () => {
  it("値と位置（%）を相互に変換する", () => {
    expect(sliderPercent(25, 0, 100)).toBe(25);
    expect(sliderPercent(150, 100, 200)).toBe(50);
    expect(sliderValueFromPercent(37, 0, 100, 10)).toBe(40);
    expect(sliderValueFromPercent(120, 0, 100)).toBe(100);
  });
});

describe("sliderValueFromKey", () => {
  it("矢印キー・Home・End で値を動かす", () => {
    expect(sliderValueFromKey("ArrowRight", 50, 0, 100, 5)).toBe(55);
    expect(sliderValueFromKey("ArrowDown", 50, 0, 100, 5)).toBe(45);
    expect(sliderValueFromKey("Home", 50, 0, 100)).toBe(0);
    expect(sliderValueFromKey("End", 50, 0, 100)).toBe(100);
    expect(sliderValueFromKey("ArrowRight", 100, 0, 100)).toBe(100);
    expect(sliderValueFromKey("a", 50, 0, 100)).toBeNull();
  });
});

describe("flipSwitchLabelWidths", () => {
  it("両端ではどちらかのラベルだけが見える", () => {
    expect(flipSwitchLabelWidths(0, 30)).toEqual({ on: 0, off: 100 });
    expect(flipSwitchLabelWidths(100, 30)).toEqual({ on: 100, off: 0 });
  });

  it("途中ではつまみの位置に合わせて両方の幅が変わる", () => {
    expect(flipSwitchLabelWidths(50, 30)).toEqual({ on: 65, off: 65 });
  });
});
