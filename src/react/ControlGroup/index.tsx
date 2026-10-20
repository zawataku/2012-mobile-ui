import { useId } from "react";
import type React from "react";
import { cx } from "../../core";
import { ControlGroupContext } from "./context";

// ---------------------------------------------------------------------------
// ControlGroup（data-role="controlgroup"）
// ---------------------------------------------------------------------------
export type ControlGroupProps = {
  /** 並べる向き（data-type）。既定は vertical */
  type?: "vertical" | "horizontal";
  /** グループの見出し（<legend> 相当） */
  legend?: React.ReactNode;
  /** 中のボタンをまとめて小さいサイズにする（data-mini） */
  mini?: boolean;
  /** グループ全体に影を付ける。既定は false */
  shadow?: boolean;
  children?: React.ReactNode;
  className?: string;
};

/** ボタンなどをひとかたまりに見せる。先頭と末尾のボタンだけが角丸になる */
export const ControlGroup = ({
  type = "vertical",
  legend,
  mini = false,
  shadow = false,
  children,
  className,
}: ControlGroupProps) => {
  const labelId = useId();
  const hasLegend = legend != null;

  return (
    <div
      className={cx(
        "m2012-controlgroup m2012-corner-all",
        `m2012-controlgroup-${type}`,
        mini && "m2012-mini",
        shadow && "m2012-shadow",
        className,
      )}
      role="group"
      aria-labelledby={hasLegend ? labelId : undefined}
    >
      {hasLegend && (
        <div id={labelId} className="m2012-controlgroup-label">
          {legend}
        </div>
      )}
      <div className="m2012-controlgroup-controls">
        <ControlGroupContext value={{ type, mini }}>{children}</ControlGroupContext>
      </div>
    </div>
  );
};
