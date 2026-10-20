import { useLayoutEffect } from "react";
import type React from "react";
import { cx, popupPlacement, popupTolerance } from "../../core";
import type { Theme } from "../../core";
import { Button } from "../Button";
import { modalTransitionClassName, useModal } from "./useModal";
import type { ModalTransition } from "./useModal";

export type PopupProps = Omit<React.ComponentPropsWithRef<"div">, "children"> & {
  /** 開いているか */
  open: boolean;
  /** 背景のタップ・Escape キー・閉じるボタンで閉じようとしたとき */
  onClose?: () => void;
  /**
   * どこを中心に表示するか（data-position-to）。
   * "window" は画面の中央、要素の ref はその要素の中央、{ x, y } は画面上の座標。既定は "window"
   */
  positionTo?: "window" | React.RefObject<HTMLElement | null> | { x: number; y: number };
  /** ポップアップの swatch。省略すると宣言した場所から継承する */
  theme?: Theme;
  /** 背景の swatch（data-overlay-theme）。省略すると背景は透明（タップで閉じるのは同じ） */
  overlayTheme?: Theme;
  /** 影（data-shadow）。既定は true */
  shadow?: boolean;
  /** 角丸（data-corners）。既定は true */
  corners?: boolean;
  /** 開閉のアニメーション（data-transition）。既定は none */
  transition?: ModalTransition;
  /** 画面の端から空ける余白（data-tolerance）。既定は上下 30px・左右 15px */
  tolerance?: number | [number, number] | [number, number, number, number];
  /** 角の閉じるボタン。省略するとなし */
  closeButton?: "left" | "right";
  /** 閉じるボタンのテキスト（読み上げ用）。既定は "Close" */
  closeButtonText?: string;
  /** 中身の周りに余白を付ける（class="ui-content"） */
  padded?: boolean;
  children?: React.ReactNode;
};

/** ボタンなどの上に重ねて表示する小さな画面（ツールチップ・メニュー・フォーム・写真など） */
export const Popup = ({
  open,
  onClose,
  positionTo = "window",
  theme,
  overlayTheme,
  shadow = true,
  corners = true,
  transition = "none",
  tolerance,
  closeButton,
  closeButtonText = "Close",
  padded = false,
  className,
  children,
  ...rest
}: PopupProps) => {
  const { phase, visible, dialogRef, animatedRef, dialogProps } = useModal({
    open,
    transition,
    onClose,
  });

  // 開いたとき・画面の大きさが変わったときに位置を合わせる
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!visible || !dialog) {
      return;
    }
    const place = () => {
      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const desired = desiredPoint(positionTo, viewport);
      const { maxWidth } = popupPlacement(desired, { width: 0, height: 0 }, viewport, popupTolerance(tolerance));
      dialog.style.maxWidth = `${maxWidth}px`;
      const size = { width: dialog.offsetWidth, height: dialog.offsetHeight };
      const { left, top } = popupPlacement(desired, size, viewport, popupTolerance(tolerance));
      dialog.style.left = `${left}px`;
      dialog.style.top = `${top}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [visible, positionTo, tolerance, dialogRef]);

  if (!visible) {
    return null;
  }

  return (
    <dialog {...dialogProps} className="m2012-popup-container">
      <div
        className={cx(
          "m2012-popup-screen",
          overlayTheme && "m2012-surface-overlay",
          phase === "closing" ? "m2012-out" : "m2012-in",
        )}
        data-m2012-theme={overlayTheme}
        onClick={onClose}
      />
      <div
        {...rest}
        ref={animatedRef}
        className={cx(
          "m2012-popup m2012-surface-body",
          corners && "m2012-corner-all",
          shadow && "m2012-overlay-shadow",
          padded && "m2012-content",
          modalTransitionClassName(transition, phase),
          className,
        )}
        data-m2012-theme={theme}
      >
        {closeButton && (
          <Button
            className={`m2012-btn-${closeButton}`}
            theme="a"
            icon="delete"
            iconpos="notext"
            onClick={onClose}
          >
            {closeButtonText}
          </Button>
        )}
        {children}
      </div>
    </dialog>
  );
};

// 中心にしたい点（画面上の座標）
const desiredPoint = (
  positionTo: PopupProps["positionTo"],
  viewport: { width: number; height: number },
): { x: number; y: number } => {
  if (positionTo && positionTo !== "window") {
    if ("current" in positionTo) {
      const rect = positionTo.current?.getBoundingClientRect();
      if (rect && rect.width + rect.height > 0) {
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    } else {
      return positionTo;
    }
  }
  return { x: viewport.width / 2, y: viewport.height / 2 };
};
