import type React from "react";
import { cx } from "../../core";
import type { Theme } from "../../core";
import { Icon } from "../Icon";

// ---------------------------------------------------------------------------
// Listview （<ul> コンテナ）
// ---------------------------------------------------------------------------
export type ListviewProps = {
  /** 角丸 + ドロップシャドウ + 上下マージン（jQuery Mobile の data-inset="true" 相当） */
  inset?: boolean;
  /** 項目の swatch。省略すると親から継承する（親にもなければ c） */
  theme?: Theme;
  children?: React.ReactNode;
  className?: string;
};

export const Listview = ({ inset = false, theme, children, className }: ListviewProps) => {
  return (
    <ul
      className={cx(
        "m2012-listview",
        inset && "m2012-listview-inset m2012-corner-all m2012-shadow",
        className,
      )}
      data-m2012-theme={theme}
    >
      {children}
    </ul>
  );
};

// ---------------------------------------------------------------------------
// count バブル（.ui-li-count。swatch は jQuery Mobile の countTheme 既定値 c）
// ---------------------------------------------------------------------------
const Count = ({ children }: { children: React.ReactNode }) => (
  <span
    className="m2012-li-count m2012-surface-btn m2012-btn-corner-all"
    data-m2012-theme="c"
  >
    {children}
  </span>
);

// ---------------------------------------------------------------------------
// ListviewItem （<li>）
// ---------------------------------------------------------------------------
export type ListviewItemProps = {
  /** メインのテキスト/要素。heading を使う場合は省略可。 */
  children?: React.ReactNode;
  /** リンク先。指定すると矢印付きのクリック可能項目になる。 */
  href?: string;
  /** クリックハンドラ。href が無くてもこれがあればクリック可能項目になる。 */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /** 大きい見出し（<h3 class="ui-li-heading">） */
  heading?: React.ReactNode;
  /** 補助説明テキスト（<p class="ui-li-desc">） */
  desc?: React.ReactNode;
  /** 右寄せの補足テキスト（<p class="ui-li-aside">） */
  aside?: React.ReactNode;
  /** 右側の count バブル */
  count?: React.ReactNode;
  /** 左側の 16px アイコン画像 URL */
  icon?: string;
  iconAlt?: string;
  /** 左側の 80px サムネイル画像 URL */
  thumb?: string;
  thumbAlt?: string;
  /**
   * 右矢印の表示。既定ではクリック可能項目（href / onClick あり）で true。
   * 明示的に false で消す / true で強制表示。
   */
  arrow?: boolean;
  /** この項目だけの swatch。省略すると Listview から継承する */
  theme?: Theme;
  className?: string;
};

export const ListviewItem = ({
  children,
  href,
  onClick,
  heading,
  desc,
  aside,
  count,
  icon,
  iconAlt = "",
  thumb,
  thumbAlt = "",
  arrow,
  theme,
  className,
}: ListviewItemProps) => {
  const clickable = href != null || onClick != null;
  const showArrow = arrow ?? clickable;
  const hasCount = count != null;
  const multiline = heading != null || desc != null || thumb != null;

  const content = (
    <>
      {heading != null && <h3 className="m2012-li-heading">{heading}</h3>}
      {children}
      {desc != null && <p className="m2012-li-desc">{desc}</p>}
      {aside != null && <p className="m2012-li-aside">{aside}</p>}
    </>
  );

  return (
    <li
      className={cx(
        "m2012-li m2012-surface-btn",
        clickable ? "m2012-li-link m2012-clickable" : "m2012-li-static",
        multiline && "m2012-li-multiline",
        showArrow && "m2012-li-has-arrow",
        hasCount && "m2012-li-has-count",
        icon && "m2012-li-has-icon",
        thumb && "m2012-li-has-thumb",
        className,
      )}
      data-m2012-theme={theme}
    >
      {clickable ? (
        <a
          className="m2012-li-inner m2012-link-inherit"
          href={href}
          onClick={onClick}
          role={href == null ? "button" : undefined}
          tabIndex={href == null ? 0 : undefined}
        >
          {content}
        </a>
      ) : (
        <div className="m2012-li-inner">{content}</div>
      )}
      {icon && <img className="m2012-li-icon" src={icon} alt={iconAlt} />}
      {thumb && <img className="m2012-li-thumb" src={thumb} alt={thumbAlt} />}
      {hasCount && <Count>{count}</Count>}
      {showArrow && <Icon name="arrow-r" shadow className="m2012-li-arrow" />}
    </li>
  );
};

// ---------------------------------------------------------------------------
// ListviewDivider （<li class="ui-li-divider">：青いバーの区切り）
// ---------------------------------------------------------------------------
export type ListviewDividerProps = {
  children?: React.ReactNode;
  /** 右側の count バブル */
  count?: React.ReactNode;
  /** swatch。jQuery Mobile の dividerTheme と同じく既定は b */
  theme?: Theme;
  className?: string;
};

export const ListviewDivider = ({
  children,
  count,
  theme = "b",
  className,
}: ListviewDividerProps) => {
  return (
    <li
      className={cx(
        "m2012-li m2012-li-divider m2012-surface-bar",
        count != null && "m2012-li-has-count",
        className,
      )}
      data-m2012-theme={theme}
    >
      {children}
      {count != null && <Count>{count}</Count>}
    </li>
  );
};
