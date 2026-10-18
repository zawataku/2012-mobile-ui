import { Children, isValidElement } from "react";
import type React from "react";
import { cx, gridClassNames } from "../../core";
import type { GridColumns } from "../../core";

// ---------------------------------------------------------------------------
// Grid（ui-grid-* / ui-block-*）
// ---------------------------------------------------------------------------
export type GridProps = Omit<React.ComponentPropsWithRef<"div">, "children"> & {
  /** 列数。省略すると子要素の数から決める（6 個以上は 2 列） */
  columns?: GridColumns;
  /** 各列に入れる要素。1 つずつブロック（ui-block-*）で包む */
  children?: React.ReactNode;
};

/** 子要素を等幅の列に並べる。行が埋まると次の行に折り返す */
export const Grid = ({ columns, className, children, ...rest }: GridProps) => {
  const items = Children.toArray(children);
  const { container, blocks } = gridClassNames(items.length, columns);

  return (
    <div {...rest} className={cx(container, className)}>
      {items.map((item, i) => (
        <div key={isValidElement(item) && item.key != null ? item.key : i} className={blocks[i]}>
          {item}
        </div>
      ))}
    </div>
  );
};
