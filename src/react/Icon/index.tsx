import type React from "react";
import { cx, iconClassName } from "../../core";
import type { IconClassOptions, IconName } from "../../core";

// ---------------------------------------------------------------------------
// Icon（<span class="ui-icon ui-icon-*">）
// ---------------------------------------------------------------------------
export type IconProps = IconClassOptions & {
  /** アイコンの種類 */
  name: IconName;
  className?: string;
  style?: React.CSSProperties;
};

/** jQuery Mobile 1.2.0 のスプライトによるアイコン。装飾扱いなのでスクリーンリーダーには読ませない */
export const Icon = ({ name, shadow, alt, className, style }: IconProps) => (
  <span
    className={cx(iconClassName(name, { shadow, alt }), className)}
    style={style}
    aria-hidden="true"
  />
);
