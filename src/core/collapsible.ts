import { cx } from "./cx";
import type { IconName } from "./icon";

export type CollapsibleClassOptions = {
  /** 閉じているか */
  collapsed: boolean;
  /** 角丸・左右の枠線付きで、上下に余白を取る（data-inset）。既定は true */
  inset?: boolean;
  /** 中身に swatch の背景と枠線を付ける（data-content-theme） */
  themedContent?: boolean;
};

export type CollapsibleClassNames = {
  /** 全体（ui-collapsible） */
  root: string;
  /** 見出し（ui-collapsible-heading） */
  heading: string;
  /** 中身（ui-collapsible-content） */
  content: string;
};

/**
 * 折りたたみの各要素の class 名を組み立てる（jQuery Mobile の collapsible 相当）。
 * 見出しのボタンの角丸は、inset と開閉状態・セット内の位置から CSS で決める。
 */
export const collapsibleClassNames = ({
  collapsed,
  inset = true,
  themedContent = false,
}: CollapsibleClassOptions): CollapsibleClassNames => ({
  root: cx(
    "m2012-collapsible",
    inset && "m2012-collapsible-inset",
    collapsed && "m2012-collapsible-collapsed",
  ),
  heading: cx("m2012-collapsible-heading", collapsed && "m2012-collapsible-heading-collapsed"),
  content: cx(
    "m2012-collapsible-content",
    themedContent && "m2012-surface-body",
    collapsed && "m2012-collapsible-content-collapsed",
  ),
});

/** 見出しのアイコン（閉じているとき plus、開いているとき minus が既定） */
export const collapsibleIcon = (
  collapsed: boolean,
  { collapsedIcon = "plus", expandedIcon = "minus" }: { collapsedIcon?: IconName; expandedIcon?: IconName } = {},
): IconName => (collapsed ? collapsedIcon : expandedIcon);
