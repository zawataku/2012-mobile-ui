import type React from "react";
import { cx } from "../../core";
import type { Theme } from "../../core";
import { Button } from "../Button";
import { modalTransitionClassName, useModal } from "./useModal";
import type { ModalTransition } from "./useModal";

export type DialogProps = {
  /** 開いているか */
  open: boolean;
  /** 閉じるボタン・Escape キーで閉じようとしたとき */
  onClose?: () => void;
  /** ヘッダーのタイトル */
  title?: React.ReactNode;
  /** フッターの中身。省略するとフッターなし */
  footer?: React.ReactNode;
  /** 本文の swatch。jQuery Mobile と同じく既定は c */
  theme?: Theme;
  /** ヘッダーの swatch。既定は a */
  headerTheme?: Theme;
  /** フッターの swatch。既定は a */
  footerTheme?: Theme;
  /** 背景の swatch（data-overlay-theme）。既定は a */
  overlayTheme?: Theme;
  /** ヘッダー左の閉じるボタンを出す。既定は true */
  closeButton?: boolean;
  /** 閉じるボタンのテキスト（読み上げ用）。既定は "Close" */
  closeButtonText?: string;
  /** 開閉のアニメーション。jQuery Mobile と同じく既定は pop */
  transition?: ModalTransition;
  children?: React.ReactNode;
  className?: string;
};

/**
 * 画面全体を覆い、中央に枠を出すダイアログ（jQuery Mobile の data-role="dialog" のページ）。
 * 確認や短い入力に使う
 */
export const Dialog = ({
  open,
  onClose,
  title,
  footer,
  theme = "c",
  headerTheme = "a",
  footerTheme = "a",
  overlayTheme = "a",
  closeButton = true,
  closeButtonText = "Close",
  transition = "pop",
  children,
  className,
}: DialogProps) => {
  const { phase, visible, animatedRef, dialogProps } = useModal({ open, transition, onClose });

  if (!visible) {
    return null;
  }

  const hasHeader = title != null || closeButton;

  return (
    <dialog
      {...dialogProps}
      className="m2012-dialog m2012-surface-overlay"
      data-m2012-theme={overlayTheme}
      aria-label={typeof title === "string" ? title : undefined}
    >
      <div
        ref={animatedRef}
        className={cx(
          "m2012-dialog-contain m2012-corner-all m2012-overlay-shadow",
          modalTransitionClassName(transition, phase),
          className,
        )}
      >
        {hasHeader && (
          <div
            className="m2012-header m2012-surface-bar m2012-corner-top"
            data-m2012-theme={headerTheme}
          >
            {closeButton && (
              <div className="m2012-btn-left">
                <Button icon="delete" iconpos="notext" onClick={onClose}>
                  {closeButtonText}
                </Button>
              </div>
            )}
            {title != null && <h1 className="m2012-title">{title}</h1>}
          </div>
        )}
        <div
          className={cx(
            "m2012-content m2012-surface-body",
            !hasHeader && "m2012-corner-top",
            footer == null && "m2012-corner-bottom",
          )}
          data-m2012-theme={theme}
        >
          {children}
        </div>
        {footer != null && (
          <div
            className="m2012-footer m2012-surface-bar m2012-corner-bottom"
            data-m2012-theme={footerTheme}
          >
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
};
