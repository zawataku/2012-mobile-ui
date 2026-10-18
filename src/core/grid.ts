/** グリッドの種類（ui-grid-*）。solo は 1 列、a〜d は 2〜5 列 */
export const GRID_TYPES = ["solo", "a", "b", "c", "d"] as const;
export type GridType = (typeof GRID_TYPES)[number];

const COLUMNS: Record<GridType, number> = { solo: 1, a: 2, b: 3, c: 4, d: 5 };
const BLOCKS = ["a", "b", "c", "d", "e"] as const;

export type GridClassNames = {
  /** コンテナ（ui-grid-*） */
  container: string;
  /** 各子要素（ui-block-*） */
  blocks: string[];
};

/**
 * グリッドの class 名を組み立てる（jQuery Mobile の $.fn.grid 相当）。
 * grid を省略すると子要素の数から決める。6 個以上なら 2 列（ui-grid-duo）。
 */
export const gridClassNames = (count: number, grid?: GridType): GridClassNames => {
  let type = grid;
  let duo = false;
  if (!type) {
    if (count <= 5) {
      type = GRID_TYPES[Math.max(count, 1) - 1];
    } else {
      type = "a";
      duo = true;
    }
  }
  const columns = COLUMNS[type];

  return {
    container: `m2012-grid-${type}` + (duo ? " m2012-grid-duo" : ""),
    blocks: Array.from({ length: count }, (_, i) => `m2012-block-${BLOCKS[i % columns]}`),
  };
};
