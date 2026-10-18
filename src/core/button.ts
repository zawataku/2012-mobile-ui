import { cx } from "./cx";
import { iconClassName } from "./icon";
import type { IconName } from "./icon";

/** ボタン内のアイコンの位置（data-iconpos） */
export const ICON_POSITIONS = ["left", "right", "top", "bottom", "notext"] as const;
export type IconPosition = (typeof ICON_POSITIONS)[number];

export type ButtonClassOptions = {
  /** アイコンの種類（data-icon） */
  icon?: IconName;
  /** アイコンの位置。icon を指定したときの既定は left。notext はアイコンのみ表示 */
  iconpos?: IconPosition;
  /**
   * 横幅をテキストに合わせる（data-inline）。
   * false を明示すると、ヘッダー内などで inline が既定の場所でもブロック表示にする
   */
  inline?: boolean;
  /**
   * 小さいサイズ（data-mini）。
   * false を明示すると、ヘッダー内などで mini が既定の場所でも通常サイズにする
   */
  mini?: boolean;
  /** 角丸（data-corners）。既定は true */
  corners?: boolean;
  /** 影（data-shadow）。既定は true */
  shadow?: boolean;
  /** アイコンの影（data-iconshadow）。既定は true */
  iconshadow?: boolean;
  /** active 状態（ui-btn-active） */
  active?: boolean;
  /** 無効状態（ui-disabled） */
  disabled?: boolean;
};

export type ButtonClassNames = {
  /** ボタン本体（ui-btn） */
  root: string;
  /** 内側（ui-btn-inner） */
  inner: string;
  /** テキスト（ui-btn-text） */
  text: string;
  /** アイコン（ui-icon）。アイコンなしなら null */
  icon: string | null;
};

/**
 * ボタンの各要素の class 名を組み立てる（jQuery Mobile の buttonMarkup 相当）。
 * 色は btn surface と data-m2012-theme 属性で決まるので、ここでは swatch を扱わない。
 */
export const buttonClassNames = ({
  icon,
  iconpos,
  inline,
  mini,
  corners = true,
  shadow = true,
  iconshadow = true,
  active = false,
  disabled = false,
}: ButtonClassOptions = {}): ButtonClassNames => {
  const position = icon ? (iconpos ?? "left") : undefined;

  return {
    root: cx(
      "m2012-btn m2012-surface-btn",
      !disabled && "m2012-clickable",
      shadow && "m2012-shadow",
      corners && "m2012-btn-corner-all",
      mini === true && "m2012-mini",
      mini === false && "m2012-fullsize",
      inline === true && "m2012-btn-inline",
      inline === false && "m2012-btn-block",
      position && `m2012-btn-icon-${position}`,
      active && "m2012-btn-active",
      disabled && "m2012-disabled",
    ),
    inner: cx("m2012-btn-inner", corners && "m2012-btn-corner-all"),
    text: "m2012-btn-text",
    icon: icon ? iconClassName(icon, { shadow: iconshadow }) : null,
  };
};
