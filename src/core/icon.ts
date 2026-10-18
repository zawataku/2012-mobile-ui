/** アイコンの一覧（jQuery Mobile 1.2.0 のスプライトの並び順） */
export const ICON_NAMES = [
  "plus",
  "minus",
  "delete",
  "arrow-r",
  "arrow-l",
  "arrow-u",
  "arrow-d",
  "check",
  "gear",
  "refresh",
  "forward",
  "back",
  "grid",
  "star",
  "alert",
  "info",
  "home",
  "search",
  "checkbox-on",
  "checkbox-off",
  "radio-on",
  "radio-off",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export type IconClassOptions = {
  /** アイコン下の白い影（ui-icon-shadow） */
  shadow?: boolean;
  /** 黒いアイコン + 白いディスク（ui-icon-alt） */
  alt?: boolean;
};

/** アイコンの class 名を組み立てる */
export const iconClassName = (
  name: IconName,
  { shadow = false, alt = false }: IconClassOptions = {},
): string =>
  ["m2012-icon", `m2012-icon-${name}`, shadow && "m2012-icon-shadow", alt && "m2012-icon-alt"]
    .filter(Boolean)
    .join(" ");
