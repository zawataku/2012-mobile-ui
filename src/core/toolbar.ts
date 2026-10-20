/** ヘッダーかフッターか */
export type ToolbarType = "header" | "footer";

/** 固定ツールバーの表示・非表示のアニメーション（data-transition）。slide はヘッダーなら下、フッターなら上から */
export type ToolbarTransition = "slide" | "fade" | "none";

/**
 * 固定ツールバーの状態。
 * hiding / showing はアニメーション中で、animationend で hidden / visible に進む。
 */
export type ToolbarPhase = "visible" | "hiding" | "hidden" | "showing";

/**
 * タップしてもツールバーの表示を切り替えない要素（tapToggleBlacklist）。
 * jQuery Mobile ではチェックボックスのラベルとスライダーがクリックの伝播を止めていたため、label と .m2012-slider も含める
 */
export const TAP_TOGGLE_IGNORE =
  "a, button, input, select, textarea, label, .m2012-slider, .m2012-header-fixed, .m2012-footer-fixed, .m2012-popup";

/** フォーカス中はツールバーを隠す要素（hideDuringFocus）。ソフトウェアキーボードと重ならないようにする */
export const HIDE_DURING_FOCUS = "input, textarea, select";

export type ToolbarClassOptions = {
  type: ToolbarType;
  /** スクロールしても画面に残す（data-position="fixed"） */
  fixed?: boolean;
  /** コンテンツに重ねて表示する（data-fullscreen）。fixed のときだけ有効 */
  fullscreen?: boolean;
  transition?: ToolbarTransition;
  phase?: ToolbarPhase;
};

/** ヘッダー・フッターの class 名を組み立てる */
export const toolbarClassName = ({
  type,
  fixed = false,
  fullscreen = false,
  transition = "slide",
  phase = "visible",
}: ToolbarClassOptions): string => {
  const classes = [`m2012-${type}`, "m2012-surface-bar"];
  if (!fixed) {
    return classes.join(" ");
  }

  classes.push(`m2012-${type}-fixed`);
  if (fullscreen) {
    classes.push(`m2012-${type}-fullscreen`);
  }
  if (transition !== "none") {
    classes.push(
      transition === "slide"
        ? type === "header"
          ? "m2012-slidedown"
          : "m2012-slideup"
        : "m2012-fade",
    );
  }
  if (phase === "hiding") {
    classes.push("m2012-out");
    if (transition === "slide") {
      classes.push("m2012-reverse");
    }
  } else if (phase === "showing") {
    classes.push("m2012-in");
  } else if (phase === "hidden") {
    classes.push("m2012-fixed-hidden");
  }
  return classes.join(" ");
};

/** 表示状態を wantVisible に向けて進めたときの次の状態 */
export const nextToolbarPhase = (
  phase: ToolbarPhase,
  wantVisible: boolean,
  animate: boolean,
): ToolbarPhase => {
  const visible = phase === "visible" || phase === "showing";
  if (visible === wantVisible) {
    return phase;
  }
  if (wantVisible) {
    return animate ? "showing" : "visible";
  }
  return animate ? "hiding" : "hidden";
};

/** アニメーションが終わったときの次の状態 */
export const settleToolbarPhase = (phase: ToolbarPhase): ToolbarPhase =>
  phase === "hiding" ? "hidden" : phase === "showing" ? "visible" : phase;

/** 表示状態 */
export const isToolbarVisible = (phase: ToolbarPhase): boolean =>
  phase === "visible" || phase === "showing";

/**
 * 表示・非表示をアニメーションさせるか（jQuery Mobile の _useTransition 相当）。
 * fullscreen 以外では、ツールバーが本来の位置から離れているとき（スクロールしているとき）だけアニメーションする。
 */
export const shouldAnimateToolbar = (
  element: HTMLElement,
  { type, fullscreen = false, transition = "slide" }: ToolbarClassOptions,
): boolean => {
  if (transition === "none") {
    return false;
  }
  const view = element.ownerDocument.defaultView;
  if (!view || view.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  if (fullscreen) {
    return true;
  }

  const height = element.offsetHeight;
  if (type === "header") {
    return view.scrollY > height;
  }
  const page = element.closest(".m2012-page") ?? element.ownerDocument.documentElement;
  return view.scrollY + view.innerHeight < page.scrollHeight - height;
};
