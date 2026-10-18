import type React from "react";
import { cx } from "../../core";
import type { Theme } from "../../core";

// ---------------------------------------------------------------------------
// Page（data-role="page"）
// ---------------------------------------------------------------------------
export type PageProps = Omit<React.ComponentPropsWithRef<"div">, "children"> & {
  /** swatch。jQuery Mobile と同じく既定は c */
  theme?: Theme;
  children?: React.ReactNode;
};

/**
 * 1 画面分のページ。Header・Content・Footer を入れる。
 * どのページを表示するか（画面遷移）は利用側のルーターに任せる。
 */
export const Page = ({ theme = "c", className, children, ...rest }: PageProps) => (
  <div
    {...rest}
    className={cx("m2012-page m2012-surface-body", className)}
    data-m2012-theme={theme}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Content（data-role="content"）
// ---------------------------------------------------------------------------
export type ContentProps = Omit<React.ComponentPropsWithRef<"div">, "children"> & {
  /** swatch。省略するとページの swatch をそのまま使う */
  theme?: Theme;
  children?: React.ReactNode;
};

/** ページの本文。左右 15px の余白を持つ */
export const Content = ({ theme, className, children, ...rest }: ContentProps) => (
  <div
    role="main"
    {...rest}
    className={cx("m2012-content", theme && "m2012-surface-body", className)}
    data-m2012-theme={theme}
  >
    {children}
  </div>
);
