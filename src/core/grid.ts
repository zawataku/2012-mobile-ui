/** グリッドの列数 */
export type GridColumns = 1 | 2 | 3 | 4 | 5;

// 列数とグリッドの種類（ui-grid-*）の対応。1 列は solo、2〜5 列は a〜d
const GRID_TYPES = { 1: "solo", 2: "a", 3: "b", 4: "c", 5: "d" } as const;
const BLOCKS = ["a", "b", "c", "d", "e"] as const;

export type GridClassNames = {
  /** コンテナ（ui-grid-*） */
  container: string;
  /** 各子要素（ui-block-*） */
  blocks: string[];
};

/**
 * グリッドの class 名を組み立てる（jQuery Mobile の $.fn.grid 相当）。
 * columns を省略すると子要素の数から決める。6 個以上なら 2 列（ui-grid-duo）。
 */
export const gridClassNames = (count: number, columns?: GridColumns): GridClassNames => {
  let cols = columns;
  let duo = false;
  if (!cols) {
    if (count <= 5) {
      cols = Math.max(count, 1) as GridColumns;
    } else {
      cols = 2;
      duo = true;
    }
  }

  return {
    container: `m2012-grid-${GRID_TYPES[cols]}` + (duo ? " m2012-grid-duo" : ""),
    blocks: Array.from({ length: count }, (_, i) => `m2012-block-${BLOCKS[i % cols]}`),
  };
};
