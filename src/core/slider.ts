/** 値を min〜max に収め、step の倍数にそろえる（jQuery Mobile の slider の refresh と同じ丸め方） */
export const snapSliderValue = (value: number, min: number, max: number, step = 1): number => {
  const safeStep = step > 0 ? step : 1;
  const offset = (value - min) % safeStep;
  let aligned = value - offset;
  if (Math.abs(offset) * 2 >= safeStep) {
    aligned += offset > 0 ? safeStep : -safeStep;
  }
  // 小数の誤差を丸める（jQuery UI と同じく小数点以下 5 桁）
  const rounded = parseFloat(aligned.toFixed(5));
  return Math.min(Math.max(rounded, min), max);
};

/** 値がつまみの位置として何 % か（0〜100） */
export const sliderPercent = (value: number, min: number, max: number): number => {
  if (max === min) {
    return 0;
  }
  const percent = ((value - min) / (max - min)) * 100;
  return Math.min(Math.max(percent, 0), 100);
};

/** つまみの位置（%）から値を求める */
export const sliderValueFromPercent = (
  percent: number,
  min: number,
  max: number,
  step = 1,
): number => {
  const clamped = Math.min(Math.max(percent, 0), 100);
  return snapSliderValue((clamped / 100) * (max - min) + min, min, max, step);
};

/** キー操作による次の値。対応しないキーなら null */
export const sliderValueFromKey = (
  key: string,
  value: number,
  min: number,
  max: number,
  step = 1,
): number | null => {
  switch (key) {
    case "Home":
      return min;
    case "End":
      return max;
    case "PageUp":
    case "ArrowUp":
    case "ArrowRight":
      return snapSliderValue(value + step, min, max, step);
    case "PageDown":
    case "ArrowDown":
    case "ArrowLeft":
      return snapSliderValue(value - step, min, max, step);
    default:
      return null;
  }
};

/**
 * フリップスイッチの 2 つのラベルの幅（%）。
 * on 側（a）はつまみの左、off 側（b）はつまみの右に見える。handlePercent はつまみの幅がトラックの何 % か
 */
export const flipSwitchLabelWidths = (
  percent: number,
  handlePercent: number,
): { on: number; off: number } => {
  const on = percent && handlePercent + ((100 - handlePercent) * percent) / 100;
  const off = percent === 100 ? 0 : Math.min(handlePercent + 100 - on, 100);
  return { on, off };
};
