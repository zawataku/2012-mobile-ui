import React from "react";
import styles from "./Listview.module.css";

const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(" ");

// ---------------------------------------------------------------------------
// Listview （<ul> コンテナ）
// ---------------------------------------------------------------------------
export type ListviewProps = {
  /** 角丸 + ドロップシャドウ + 上下マージン（jQuery Mobile の data-inset="true" 相当） */
  inset?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const Listview = ({ inset = false, children, className }: ListviewProps) => {
  return (
    <ul className={cx(styles.listview, inset && styles.inset, className)}>
      {children}
    </ul>
  );
};

// ---------------------------------------------------------------------------
// 右矢印アイコン（.ui-icon-arrow-r.ui-icon-shadow 相当）
// ---------------------------------------------------------------------------
const ArrowIcon = () => (
  <span className={styles.arrow} aria-hidden="true">
    <svg viewBox="0 0 18 18" focusable="false">
      <path
        d="M6.5 4 L11.5 9 L6.5 14"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  className,
}: ListviewItemProps) => {
  const clickable = href != null || onClick != null;
  const showArrow = arrow ?? clickable;
  const hasCount = count != null;
  const isRich = heading != null || desc != null || thumb != null;

  const content = (
    <>
      {heading != null && <h3 className={styles.heading}>{heading}</h3>}
      {children}
      {desc != null && <p className={styles.desc}>{desc}</p>}
      {aside != null && <p className={styles.aside}>{aside}</p>}
    </>
  );

  const innerClass = cx(
    styles.inner,
    isRich && styles.innerRich,
    showArrow && styles.hasArrow,
    hasCount && styles.hasCount,
    icon && styles.hasIcon,
    thumb && styles.hasThumb,
  );

  const inner = clickable ? (
    <a
      className={innerClass}
      href={href}
      onClick={onClick}
      role={href == null ? "button" : undefined}
      tabIndex={href == null ? 0 : undefined}
    >
      {content}
    </a>
  ) : (
    <div className={innerClass}>{content}</div>
  );

  return (
    <li
      className={cx(styles.li, clickable ? styles.link : styles.static, className)}
    >
      {inner}
      {icon && <img className={styles.icon} src={icon} alt={iconAlt} />}
      {thumb && <img className={styles.thumb} src={thumb} alt={thumbAlt} />}
      {hasCount && (
        <span className={cx(styles.count, showArrow && styles.countWithArrow)}>
          {count}
        </span>
      )}
      {showArrow && <ArrowIcon />}
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
  className?: string;
};

export const ListviewDivider = ({
  children,
  count,
  className,
}: ListviewDividerProps) => {
  return (
    <li
      className={cx(
        styles.li,
        styles.divider,
        count != null && styles.dividerHasCount,
        className,
      )}
    >
      {children}
      {count != null && <span className={styles.count}>{count}</span>}
    </li>
  );
};
