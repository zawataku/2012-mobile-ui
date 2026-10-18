import { useEffect, useRef, useState } from "react";
import {
  HIDE_DURING_FOCUS,
  TAP_TOGGLE_IGNORE,
  isToolbarVisible,
  nextToolbarPhase,
  settleToolbarPhase,
  shouldAnimateToolbar,
} from "../../core";
import type { ToolbarPhase, ToolbarTransition, ToolbarType } from "../../core";

export type FixedToolbarOptions = {
  /** スクロールしても画面に残す（data-position="fixed"） */
  fixed?: boolean;
  /** コンテンツに重ねて半透明で表示する（data-fullscreen）。fixed のときだけ有効 */
  fullscreen?: boolean;
  /** ページのタップで表示・非表示を切り替える（data-tap-toggle）。既定は true */
  tapToggle?: boolean;
  /** 表示・非表示のアニメーション（data-transition）。既定は slide */
  transition?: ToolbarTransition;
};

// animationend が来なかった場合（CSS が読み込まれていないなど）に状態を進める時間
const SETTLE_TIMEOUT = 1000;

/**
 * 固定ツールバーの表示・非表示（jQuery Mobile の fixedtoolbar 相当）。
 * ページ（なければ document）のタップで切り替え、入力欄にフォーカスがある間は隠す。
 */
export const useFixedToolbar = (
  type: ToolbarType,
  { fixed = false, fullscreen = false, tapToggle = true, transition = "slide" }: FixedToolbarOptions,
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<ToolbarPhase>("visible");

  useEffect(() => {
    const element = ref.current;
    if (!fixed || !element) {
      return;
    }
    const options = { type, fullscreen, transition };
    const request = (wantVisible?: boolean) => {
      const animate = shouldAnimateToolbar(element, options);
      setPhase((current) =>
        nextToolbarPhase(current, wantVisible ?? !isToolbarVisible(current), animate),
      );
    };

    const onClick = (event: Event) => {
      const target = event.target as Element | null;
      if (tapToggle && !target?.closest?.(TAP_TOGGLE_IGNORE)) {
        request();
      }
    };
    const onFocus = (event: Event) => {
      const target = event.target as Element | null;
      const view = element.ownerDocument.defaultView;
      if (
        view &&
        view.screen.width < 500 &&
        target?.matches?.(HIDE_DURING_FOCUS) &&
        !target.closest(".m2012-header-fixed, .m2012-footer-fixed")
      ) {
        request(event.type === "focusout");
      }
    };

    const scope: HTMLElement | Document = element.closest<HTMLElement>(".m2012-page") ?? element.ownerDocument;
    scope.addEventListener("click", onClick);
    scope.addEventListener("focusin", onFocus);
    scope.addEventListener("focusout", onFocus);
    return () => {
      scope.removeEventListener("click", onClick);
      scope.removeEventListener("focusin", onFocus);
      scope.removeEventListener("focusout", onFocus);
    };
  }, [type, fixed, fullscreen, transition, tapToggle]);

  useEffect(() => {
    if (phase !== "hiding" && phase !== "showing") {
      return;
    }
    const timer = setTimeout(() => setPhase(settleToolbarPhase), SETTLE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [phase]);

  // React の onAnimationEnd は環境によって接頭辞付きのイベント名を使うため、直接 animationend を受け取る
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const onAnimationEnd = (event: Event) => {
      if (event.target === element) {
        setPhase(settleToolbarPhase);
      }
    };
    element.addEventListener("animationend", onAnimationEnd);
    return () => element.removeEventListener("animationend", onAnimationEnd);
  }, []);

  return { ref, phase };
};
