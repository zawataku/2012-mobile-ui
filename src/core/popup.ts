/** 画面の端から空ける余白（data-tolerance）。上・右・下・左 */
export type PopupTolerance = { top: number; right: number; bottom: number; left: number };

/** jQuery Mobile の既定の余白（上下 30px・左右 15px） */
export const DEFAULT_POPUP_TOLERANCE: PopupTolerance = { top: 30, right: 15, bottom: 30, left: 15 };

/**
 * 余白の指定を展開する。数値 1 つなら四方、2 つなら [上下, 左右]、4 つなら [上, 右, 下, 左]（CSS の順）
 */
export const popupTolerance = (
  value?: number | [number, number] | [number, number, number, number],
): PopupTolerance => {
  if (value == null) {
    return DEFAULT_POPUP_TOLERANCE;
  }
  if (typeof value === "number") {
    return { top: value, right: value, bottom: value, left: value };
  }
  if (value.length === 2) {
    return { top: value[0], right: value[1], bottom: value[0], left: value[1] };
  }
  return { top: value[0], right: value[1], bottom: value[2], left: value[3] };
};

// 区間 [offset, offset + available] の中に、長さ size の区間を desired を中心に置く。はみ出すなら端に寄せる
const fitSegment = (available: number, size: number, offset: number, desired: number): number =>
  available < size
    ? offset + (available - size) / 2
    : Math.min(Math.max(offset, desired - size / 2), offset + available - size);

export type PopupPlacement = {
  left: number;
  top: number;
  /** ポップアップの最大幅（画面幅から左右の余白を引いたもの） */
  maxWidth: number;
};

/**
 * ポップアップの位置（画面の左上からの座標）を求める（jQuery Mobile の _placementCoords 相当）。
 * desired を中心に置き、画面の余白の内側に収まるようにずらす
 */
export const popupPlacement = (
  desired: { x: number; y: number },
  size: { width: number; height: number },
  viewport: { width: number; height: number },
  tolerance: PopupTolerance = DEFAULT_POPUP_TOLERANCE,
): PopupPlacement => {
  const availableWidth = viewport.width - tolerance.left - tolerance.right;
  const availableHeight = viewport.height - tolerance.top - tolerance.bottom;
  return {
    left: fitSegment(availableWidth, size.width, tolerance.left, desired.x),
    top: Math.max(0, fitSegment(availableHeight, size.height, tolerance.top, desired.y)),
    maxWidth: availableWidth,
  };
};
