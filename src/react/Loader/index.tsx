import { cx } from "../../core";
import type { Theme } from "../../core";

// ---------------------------------------------------------------------------
// Loader（$.mobile.loading / showPageLoadingMsg）
// ---------------------------------------------------------------------------
export type LoaderProps = {
  /** 表示するか。既定は true */
  visible?: boolean;
  /** テキスト。既定は "loading" */
  text?: string;
  /** テキストを表示する（textVisible）。既定は false（スピナーのみ。テキストは読み上げにだけ使う） */
  textVisible?: boolean;
  /** スピナーを出さずテキストだけを表示する（textonly） */
  textonly?: boolean;
  /** swatch。jQuery Mobile と同じく既定は a */
  theme?: Theme;
  className?: string;
};

/** 画面の中央に出す読み込み中の表示 */
export const Loader = ({
  visible = true,
  text = "loading",
  textVisible = false,
  textonly = false,
  theme = "a",
  className,
}: LoaderProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={cx(
        "m2012-loader m2012-surface-body m2012-corner-all",
        textVisible || textonly ? "m2012-loader-verbose" : "m2012-loader-default",
        textonly && "m2012-loader-textonly",
        className,
      )}
      data-m2012-theme={theme}
      role="status"
    >
      <span className="m2012-icon m2012-icon-loading" aria-hidden="true" />
      <span className="m2012-loader-text">{text}</span>
    </div>
  );
};
