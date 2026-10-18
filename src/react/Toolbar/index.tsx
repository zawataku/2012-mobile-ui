import type React from "react";
import { cx, toolbarClassName } from "../../core";
import type { Theme } from "../../core";
import { Button } from "../Button";
import type { NativeButtonProps } from "../Button";
import { useFixedToolbar } from "./useFixedToolbar";
import type { FixedToolbarOptions } from "./useFixedToolbar";

export type { FixedToolbarOptions } from "./useFixedToolbar";

// ---------------------------------------------------------------------------
// Header（data-role="header"）
// ---------------------------------------------------------------------------
export type HeaderProps = FixedToolbarOptions & {
  /** タイトル（<h1 class="ui-title">） */
  title?: React.ReactNode;
  /** 左端に置く要素（ui-btn-left）。通常は Button */
  left?: React.ReactNode;
  /** 右端に置く要素（ui-btn-right）。通常は Button */
  right?: React.ReactNode;
  /** swatch。jQuery Mobile と同じく既定は a */
  theme?: Theme;
  /** タイトルの下に続ける要素（Navbar など） */
  children?: React.ReactNode;
  className?: string;
};

export const Header = ({
  title,
  left,
  right,
  theme = "a",
  children,
  className,
  ...fixedOptions
}: HeaderProps) => {
  const { ref, phase } = useFixedToolbar("header", fixedOptions);

  return (
    <div
      ref={ref}
      className={cx(toolbarClassName({ type: "header", ...fixedOptions, phase }), className)}
      role="banner"
      data-m2012-theme={theme}
    >
      {left != null && <div className="m2012-btn-left">{left}</div>}
      {title != null && <h1 className="m2012-title">{title}</h1>}
      {right != null && <div className="m2012-btn-right">{right}</div>}
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Footer（data-role="footer"）
// ---------------------------------------------------------------------------
export type FooterProps = FixedToolbarOptions & {
  /** 中央に表示するテキスト（ui-title） */
  title?: React.ReactNode;
  /** 中身の周りに余白を付ける（class="ui-bar"）。ボタンを並べるときに使う */
  padded?: boolean;
  /** swatch。jQuery Mobile と同じく既定は a */
  theme?: Theme;
  children?: React.ReactNode;
  className?: string;
};

export const Footer = ({
  title,
  padded = false,
  theme = "a",
  children,
  className,
  ...fixedOptions
}: FooterProps) => {
  const { ref, phase } = useFixedToolbar("footer", fixedOptions);

  return (
    <div
      ref={ref}
      className={cx(
        toolbarClassName({ type: "footer", ...fixedOptions, phase }),
        padded && "m2012-bar",
        className,
      )}
      role="contentinfo"
      data-m2012-theme={theme}
    >
      {title != null && <p className="m2012-title">{title}</p>}
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// BackButton（data-rel="back" の戻るボタン）
// ---------------------------------------------------------------------------
export type BackButtonProps = NativeButtonProps;

/**
 * 左向き矢印付きの「Back」ボタン（jQuery Mobile の addBackBtn 相当）。
 * onClick を指定しなければ history.back() で前の画面に戻る。
 */
export const BackButton = ({
  icon = "arrow-l",
  children = "Back",
  onClick,
  ...rest
}: BackButtonProps) => (
  <Button
    {...rest}
    icon={icon}
    onClick={onClick ?? (() => window.history.back())}
  >
    {children}
  </Button>
);
