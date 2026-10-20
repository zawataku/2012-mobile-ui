import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type React from "react";

/** 開閉のアニメーション（data-transition） */
export type ModalTransition = "none" | "pop" | "fade" | "slideup" | "slidedown";

/** 閉じている / 開いている / 閉じるアニメーション中 */
export type ModalPhase = "closed" | "open" | "closing";

// animationend が来なかった場合（CSS が読み込まれていないなど）に閉じきる時間
const SETTLE_TIMEOUT = 1000;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

/** アニメーションする要素に付ける class */
export const modalTransitionClassName = (
  transition: ModalTransition,
  phase: ModalPhase,
): string | undefined => {
  if (transition === "none") {
    return undefined;
  }
  return phase === "closing"
    ? `m2012-${transition} m2012-out m2012-reverse`
    : `m2012-${transition} m2012-in`;
};

/**
 * <dialog> を使ったモーダル（Popup・Dialog）の開閉。
 * open が false になると閉じるアニメーションを待ってから取り除く。Escape キーで onClose を呼ぶ
 */
export const useModal = ({
  open,
  transition,
  onClose,
}: {
  open: boolean;
  transition: ModalTransition;
  onClose?: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const animatedRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<ModalPhase>(open ? "open" : "closed");
  const [wasOpen, setWasOpen] = useState(open);

  // open の変化に合わせて状態を進める（描画中に前回の値と比べる）
  if (open !== wasOpen) {
    setWasOpen(open);
    const animate = transition !== "none" && !prefersReducedMotion();
    setPhase(open ? "open" : animate ? "closing" : "closed");
  }

  const visible = phase !== "closed";

  // 表示したら最前面のモーダルとして開く（showModal がない環境では open 属性で代用する）。
  // 閉じたら、開く前にフォーカスがあった要素（開いたボタンなど）にフォーカスを戻す
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!visible || !dialog) {
      return;
    }
    const previousFocus = document.activeElement;
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }
    // jQuery Mobile と同じく、中の最初のリンクではなく入れ物自体にフォーカスする（メニューの項目が選ばれて見えないように）
    dialog.focus();
    return () => {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [visible]);

  // 閉じるアニメーションが終わったら取り除く
  useEffect(() => {
    if (phase !== "closing") {
      return;
    }
    const element = animatedRef.current;
    const settle = () => setPhase((current) => (current === "closing" ? "closed" : current));
    const onAnimationEnd = (event: Event) => {
      if (event.target === element) {
        settle();
      }
    };
    element?.addEventListener("animationend", onAnimationEnd);
    const timer = setTimeout(settle, SETTLE_TIMEOUT);
    return () => {
      element?.removeEventListener("animationend", onAnimationEnd);
      clearTimeout(timer);
    };
  }, [phase]);

  const dialogProps = {
    ref: dialogRef,
    tabIndex: -1,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    },
    // ブラウザの閉じる操作（Escape・戻るジェスチャーなど）はアニメーションのため自分で閉じる
    onCancel: (event: React.SyntheticEvent) => {
      event.preventDefault();
      onClose?.();
    },
  };

  return { phase, visible, dialogRef, animatedRef, dialogProps };
};
